from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict

from app.models.product import ProductCategory


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    description: str | None
    category: ProductCategory
    price_sle: Decimal | None
    image_path: str | None
    created_at: datetime
    updated_at: datetime


class ProductListResponse(BaseModel):
    items: list[ProductResponse]
    total: int
    limit: int
    offset: int
