import tempfile
from pathlib import Path
from typing import Literal
from urllib.parse import urlsplit

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.exc import ArgumentError
from sqlalchemy.engine import URL, make_url


def _is_isolated_test_sqlite_url(url: URL) -> bool:
    if url.database in {None, "", ":memory:"}:
        return True
    if url.query:
        return False

    database_path = Path(url.database)
    if not database_path.is_absolute():
        return False

    try:
        database_path.resolve().relative_to(Path(tempfile.gettempdir()).resolve())
    except ValueError:
        return False

    return database_path.name.startswith("salone-stitch-house-test-")


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        hide_input_in_errors=True,
    )

    app_env: Literal["development", "test", "production"]
    database_url: str
    cors_allowed_origins: list[str]

    @field_validator("database_url")
    @classmethod
    def validate_database_url(cls, value: str) -> str:
        try:
            url = make_url(value)
        except (ArgumentError, TypeError, ValueError) as exc:
            raise ValueError("DATABASE_URL must be a valid database URL") from exc

        if url.drivername == "sqlite+pysqlite":
            return value
        if url.drivername != "postgresql+psycopg":
            raise ValueError("DATABASE_URL must use PostgreSQL with the psycopg driver")
        return value

    @field_validator("cors_allowed_origins")
    @classmethod
    def validate_origins(cls, origins: list[str]) -> list[str]:
        for origin in origins:
            parsed = urlsplit(origin)
            if (
                origin == "*"
                or parsed.scheme not in {"http", "https"}
                or not parsed.netloc
                or parsed.username is not None
                or parsed.password is not None
                or parsed.path not in {"", "/"}
                or parsed.query
                or parsed.fragment
            ):
                raise ValueError("CORS_ALLOWED_ORIGINS must contain explicit HTTP(S) origins")
        return [origin.rstrip("/") for origin in origins]

    @model_validator(mode="after")
    def validate_environment_database(self) -> "Settings":
        url = make_url(self.database_url)
        if self.app_env == "test":
            if url.drivername != "sqlite+pysqlite" or not _is_isolated_test_sqlite_url(url):
                raise ValueError(
                    "Tests must use in-memory SQLite or an isolated SQLite file "
                    "in the system temporary directory named "
                    "'salone-stitch-house-test-*'"
                )
        elif url.drivername != "postgresql+psycopg":
            raise ValueError("Development and production environments require PostgreSQL")

        if self.app_env == "production" and any(
            not origin.startswith("https://") for origin in self.cors_allowed_origins
        ):
            raise ValueError("Production CORS origins must use HTTPS")

        if self.app_env == "development":
            hostname = url.host or ""
            if hostname not in {"localhost", "127.0.0.1", "::1"}:
                raise ValueError("Development DATABASE_URL must point to a local PostgreSQL server")
            if "prod" in (url.database or "").lower():
                raise ValueError("Development DATABASE_URL cannot target a production database")

        return self
