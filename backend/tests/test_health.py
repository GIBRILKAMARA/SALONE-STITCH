from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path

import pytest
from alembic import command
from alembic.config import Config
from fastapi.testclient import TestClient
from pydantic import ValidationError
from sqlalchemy import URL, create_engine, inspect
from sqlalchemy.engine import Engine
from sqlalchemy.exc import SQLAlchemyError

from app.core.config import Settings
from app.main import create_app


def test_health_confirms_api_is_running(test_settings: Settings, test_engine: Engine) -> None:
    application = create_app(test_settings, test_engine)
    with TestClient(application) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_readiness_succeeds_when_database_is_available(
    test_settings: Settings,
    test_engine: Engine,
) -> None:
    application = create_app(test_settings, test_engine)
    with TestClient(application) as client:
        response = client.get("/health/ready")

    assert response.status_code == 200
    assert response.json() == {"status": "ready", "database": "available"}


def test_readiness_fails_without_exposing_database_details(
    test_settings: Settings,
    test_engine: Engine,
) -> None:
    @contextmanager
    def unavailable_connection() -> Iterator[None]:
        raise SQLAlchemyError("postgresql://private-user:private-password@db.internal/prod")
        yield

    test_engine.connect = unavailable_connection
    application = create_app(test_settings, test_engine)
    with TestClient(application) as client:
        response = client.get("/health/ready")

    assert response.status_code == 503
    assert response.json() == {"status": "not_ready", "database": "unavailable"}
    assert "private-password" not in response.text
    assert "db.internal" not in response.text


def test_missing_database_configuration_is_rejected(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("APP_ENV", raising=False)
    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.delenv("CORS_ALLOWED_ORIGINS", raising=False)

    with pytest.raises(ValueError):
        Settings(_env_file=None)


@pytest.mark.parametrize(
    "database_url",
    [
        "not a url",
        "://bad",
        "postgresql+psycopg://user:dummy-credential-marker@[::1/db",
        "postgresql+psycopg://review-user:review-secret@[::1/db",
    ],
)
def test_malformed_database_urls_are_rejected_safely(database_url: str) -> None:
    with pytest.raises(ValidationError, match="DATABASE_URL must be a valid database URL") as error:
        Settings(
            _env_file=None,
            app_env="development",
            database_url=database_url,
            cors_allowed_origins=["http://localhost:5500"],
        )

    assert error.value.errors()[0]["msg"] == (
        "Value error, DATABASE_URL must be a valid database URL"
    )
    assert database_url not in str(error.value)
    assert "dummy-credential-marker" not in str(error.value)
    assert "review-secret" not in str(error.value)


def test_in_memory_sqlite_url_is_accepted_for_tests() -> None:
    settings = Settings(
        _env_file=None,
        app_env="test",
        database_url="sqlite+pysqlite:///:memory:",
        cors_allowed_origins=["http://localhost:5500"],
    )

    assert settings.database_url == "sqlite+pysqlite:///:memory:"


def test_persistent_sqlite_url_is_rejected_for_tests(tmp_path: Path) -> None:
    database_url = URL.create(
        "sqlite+pysqlite",
        database=str(tmp_path / "persistent-test.db"),
    ).render_as_string(hide_password=False)

    with pytest.raises(ValueError, match="in-memory SQLite or an isolated SQLite file"):
        Settings(
            _env_file=None,
            app_env="test",
            database_url=database_url,
            cors_allowed_origins=["http://localhost:5500"],
        )


def test_prefixed_sqlite_file_in_temporary_directory_is_accepted_for_tests(
    tmp_path: Path,
) -> None:
    database_url = URL.create(
        "sqlite+pysqlite",
        database=str(tmp_path / "salone-stitch-house-test-migration.db"),
    ).render_as_string(hide_password=False)

    settings = Settings(
        _env_file=None,
        app_env="test",
        database_url=database_url,
        cors_allowed_origins=["http://localhost:5500"],
    )

    assert settings.database_url == database_url


def test_valid_development_database_url_is_accepted() -> None:
    settings = Settings(
        _env_file=None,
        app_env="development",
        database_url="postgresql+psycopg://app_user:placeholder@localhost:5432/salone_stitch_dev",
        cors_allowed_origins=["http://localhost:5500"],
    )

    assert settings.database_url.startswith("postgresql+psycopg://")


def test_development_cannot_use_remote_or_production_database() -> None:
    with pytest.raises(ValueError, match="local PostgreSQL"):
        Settings(
            _env_file=None,
            app_env="development",
            database_url="postgresql+psycopg://user:secret@db.example.com/salone",
            cors_allowed_origins=["http://localhost:5500"],
        )

    with pytest.raises(ValueError, match="production database"):
        Settings(
            _env_file=None,
            app_env="development",
            database_url="postgresql+psycopg://user:secret@localhost/salone_prod",
            cors_allowed_origins=["http://localhost:5500"],
        )


def test_wildcard_cors_origin_is_rejected() -> None:
    with pytest.raises(ValueError, match="explicit HTTP"):
        Settings(
            _env_file=None,
            app_env="test",
            database_url="sqlite+pysqlite:///:memory:",
            cors_allowed_origins=["*"],
        )


def test_application_disables_debug_and_uses_explicit_cors(
    test_settings: Settings,
    test_engine: Engine,
) -> None:
    application = create_app(test_settings, test_engine)

    assert application.debug is False
    cors = next(
        middleware
        for middleware in application.user_middleware
        if middleware.cls.__name__ == "CORSMiddleware"
    )
    assert cors.kwargs["allow_origins"] == ["http://localhost:5500"]
    assert cors.kwargs["allow_credentials"] is False


def test_product_migration_is_repeatable(
    monkeypatch: pytest.MonkeyPatch,
    tmp_path: Path,
) -> None:
    backend_dir = Path(__file__).resolve().parents[1]
    database_url = URL.create(
        "sqlite+pysqlite",
        database=str(tmp_path / "salone-stitch-house-test-migration.db"),
    ).render_as_string(hide_password=False)
    monkeypatch.setenv("APP_ENV", "test")
    monkeypatch.setenv("DATABASE_URL", database_url)
    monkeypatch.chdir(backend_dir)
    config = Config("alembic.ini")

    command.upgrade(config, "head")
    command.upgrade(config, "head")

    engine = create_engine(database_url)
    assert inspect(engine).get_table_names() == ["alembic_version", "products"]
    with engine.connect() as connection:
        assert connection.exec_driver_sql(
            "SELECT version_num FROM alembic_version"
        ).scalar_one() == "20261027_0002"

    command.downgrade(config, "base")
    assert inspect(engine).get_table_names() == ["alembic_version"]
    with engine.connect() as connection:
        assert connection.exec_driver_sql(
            "SELECT version_num FROM alembic_version"
        ).scalar_one_or_none() is None
    command.upgrade(config, "head")
    assert inspect(engine).get_table_names() == ["alembic_version", "products"]
    engine.dispose()
