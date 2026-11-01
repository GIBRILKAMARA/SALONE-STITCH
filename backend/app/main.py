from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import sessionmaker

from app.api.routes.health import router as health_router
from app.api.routes.products import router as products_router
from app.core.config import Settings


def create_app(settings: Settings | None = None, engine: Engine | None = None) -> FastAPI:
    configuration = settings or Settings()
    if engine is not None and configuration.app_env != "test":
        raise ValueError("An injected database engine is only supported in test environments")

    database_engine = engine or create_engine(
        configuration.database_url,
        pool_pre_ping=True,
    )
    session_factory = sessionmaker(
        bind=database_engine,
        autoflush=False,
        expire_on_commit=False,
    )

    @asynccontextmanager
    async def lifespan(_: FastAPI) -> AsyncIterator[None]:
        yield
        database_engine.dispose()

    application = FastAPI(
        title="Salone Stitch House API",
        version="0.1.0",
        debug=False,
        lifespan=lifespan,
    )
    application.state.engine = database_engine
    application.state.session_factory = session_factory
    application.state.settings = configuration
    application.add_middleware(
        CORSMiddleware,
        allow_origins=configuration.cors_allowed_origins,
        allow_credentials=False,
        allow_methods=["GET", "HEAD", "OPTIONS"],
        allow_headers=["Accept", "Content-Type"],
    )
    application.include_router(health_router)
    application.include_router(products_router)
    return application


app = create_app()
