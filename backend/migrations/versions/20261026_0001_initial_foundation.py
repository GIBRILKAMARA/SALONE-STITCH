"""Establish the initial Alembic revision without business tables.

Revision ID: 20261026_0001
Revises:
"""

from typing import Sequence

from alembic import op

revision: str = "20261026_0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
