# Salone Stitch House backend foundation

This phase adds a FastAPI process, PostgreSQL configuration, SQLAlchemy session
management, an Alembic baseline, and health endpoints. It deliberately creates no
business tables and adds no products, customers, orders, authentication, or
payment processing. The existing static frontend remains independent.

## Requirements

- Python 3.12–3.14
- PostgreSQL for development and production
- `uv` or `pip`

## Local setup

From the repository root, copy the example only if `backend\.env` does not
already exist. This PowerShell command leaves an existing environment file
unchanged:

```powershell
if (-not (Test-Path -LiteralPath backend\.env)) {
    Copy-Item backend\.env.example backend\.env
} else {
    Write-Output "backend\.env already exists; leaving it unchanged."
}
```

Edit `backend\.env` with the credentials for a **local development-only**
PostgreSQL database. Development configuration rejects remote database hosts
and database names containing `prod`. Never put real credentials in source
control or frontend files.

Then install the backend and development dependencies:

```powershell
cd backend
uv sync --extra dev
```

The equivalent pip installation is `python -m pip install -e ".[dev]"`.

## Run the API

With PostgreSQL running locally and the development settings configured:

```powershell
uv run uvicorn app.main:app --reload
```

- `GET http://127.0.0.1:8000/health` checks that the API process is running.
- `GET http://127.0.0.1:8000/health/ready` executes `SELECT 1` against the
  configured database. It returns HTTP 503 when the database is unavailable.

The API validates `APP_ENV`, `DATABASE_URL`, and `CORS_ALLOWED_ORIGINS` at
startup. CORS origins must be explicit HTTP(S) origins; wildcard origins and
credentialed CORS are not enabled.

## Product catalogue API

The read-only public catalogue endpoints expose published products only:

- `GET /api/v1/products` — list published products. Optional `category` accepts
  `mens-fashion`, `womens-fashion`, or `custom-tailoring`. Pagination uses
  `limit` (default 20, maximum 100) and `offset` (default 0).
- `GET /api/v1/products/{product_id}` — retrieve one published product by its
  stable identifier. Unknown and unpublished products both return `404`.

Responses include the stable ID, name, optional description, category, optional
`price_sle`, optional `image_path`, and timestamps. Prices are nullable because
the current catalogue has not established approved prices. Products default to
unpublished, and this phase adds no write/admin endpoints or catalogue data.

## Database migrations

The initial Alembic revision establishes the baseline; the next revision creates
the `products` table and category constraint. Migrations are not run at API
startup. Once a dedicated local development database has been deliberately
configured and its identity verified, apply migrations from `backend` with:

```powershell
uv run alembic upgrade head
uv run alembic current
```

Migrations are an explicit operator action and are never run at API startup.
Do not use development or test commands against production. Database migration
and runtime credentials should be separate and least-privileged.

## Tests

Tests force `APP_ENV=test` and use an in-memory SQLite database. They do not
connect to PostgreSQL or any configured development database:

```powershell
uv run pytest
```

They cover liveness, database readiness success and failure, sanitized failure
responses, required configuration, development database safeguards, CORS,
catalogue filtering/publication behavior, and Alembic revision behavior against
an isolated temporary SQLite database. SQLite tests do not prove PostgreSQL
connectivity or PostgreSQL migration compatibility.

## Environment variables

- `APP_ENV`: `development`, `test`, or `production`.
- `DATABASE_URL`: `postgresql+psycopg://...` for development/production.
  Development is restricted to a local host. Tests require in-memory SQLite.
- `CORS_ALLOWED_ORIGINS`: JSON array of exact frontend origins, for example
  `["http://localhost:5500"]`.

Production requires a production secret store for credentials, a managed
PostgreSQL service, TLS, backups, and a separately controlled migration step.
No production deployment or database has been configured by this phase.
