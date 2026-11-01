from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.product import Product, ProductCategory
from app.schemas.product import ProductListResponse, ProductResponse

router = APIRouter(prefix="/api/v1/products", tags=["products"])


@router.get("", response_model=ProductListResponse)
def list_products(
    category: ProductCategory | None = None,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
) -> ProductListResponse:
    filters = [Product.is_published.is_(True)]
    if category is not None:
        filters.append(Product.category == category)

    total = db.scalar(select(func.count()).select_from(Product).where(*filters)) or 0
    products = db.scalars(
        select(Product)
        .where(*filters)
        .order_by(Product.id)
        .limit(limit)
        .offset(offset)
    ).all()

    return ProductListResponse(items=products, total=total, limit=limit, offset=offset)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: str, db: Session = Depends(get_db)) -> Product:
    product = db.scalar(
        select(Product).where(
            Product.id == product_id,
            Product.is_published.is_(True),
        )
    )
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
