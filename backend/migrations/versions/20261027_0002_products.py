"""Create the public product catalogue table.

Revision ID: 20261027_0002
Revises: 20261026_0001
"""

from typing import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "20261027_0002"
down_revision: str | None = "20261026_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "products",
        sa.Column("id", sa.String(length=100), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("category", sa.String(length=16), nullable=False),
        sa.Column("price_sle", sa.Numeric(precision=12, scale=2), nullable=True),
        sa.Column("image_path", sa.String(length=1024), nullable=True),
        sa.Column(
            "is_published",
            sa.Boolean(),
            server_default=sa.false(),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "category IN ('mens-fashion', 'womens-fashion', 'custom-tailoring')",
            name="product_category",
        ),
        sa.CheckConstraint(
            "price_sle IS NULL OR price_sle >= 0",
            name="ck_products_price_sle_nonnegative",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_products_category", "products", ["category"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_products_category", table_name="products")
    op.drop_table("products")
