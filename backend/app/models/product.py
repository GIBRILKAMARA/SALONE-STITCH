from datetime import datetime
from decimal import Decimal
from enum import Enum

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    Enum as SqlEnum,
    Numeric,
    String,
    Text,
    false,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ProductCategory(str, Enum):
    MENS_FASHION = "mens-fashion"
    WOMENS_FASHION = "womens-fashion"
    CUSTOM_TAILORING = "custom-tailoring"


class Product(Base):
    __tablename__ = "products"
    __table_args__ = (
        CheckConstraint(
            "price_sle IS NULL OR price_sle >= 0",
            name="ck_products_price_sle_nonnegative",
        ),
    )

    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    category: Mapped[ProductCategory] = mapped_column(
        SqlEnum(
            ProductCategory,
            name="product_category",
            native_enum=False,
            create_constraint=True,
            values_callable=lambda enum: [item.value for item in enum],
        ),
        nullable=False,
        index=True,
    )
    price_sle: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    image_path: Mapped[str | None] = mapped_column(String(1024))
    is_published: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=false(),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )
