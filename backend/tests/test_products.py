from collections.abc import Iterator
from decimal import Decimal

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.main import create_app
from app.models.product import Product, ProductCategory


@pytest.fixture
def products_client(
    test_settings: Settings,
    test_engine: Engine,
) -> Iterator[TestClient]:
    with Session(test_engine) as session:
        session.add_all(
            [
                Product(
                    id="mens-blue-kaftan",
                    name="Blue kaftan",
                    description="Blue embroidered style reference.",
                    category=ProductCategory.MENS_FASHION,
                    price_sle=Decimal("1250.00"),
                    image_path="assets/menswear/blue-kaftan.jpg",
                    is_published=True,
                ),
                Product(
                    id="womens-printed-kaftan",
                    name="Printed kaftan",
                    description="Printed style reference.",
                    category=ProductCategory.WOMENS_FASHION,
                    price_sle=None,
                    image_path="assets/womenswear/printed-kaftan.jpg",
                    is_published=True,
                ),
                Product(
                    id="unpublished-reference",
                    name="Unpublished reference",
                    description="Not for public display.",
                    category=ProductCategory.MENS_FASHION,
                ),
            ]
        )
        session.commit()

    with TestClient(create_app(test_settings, test_engine)) as client:
        yield client


def test_list_products_returns_published_products(products_client: TestClient) -> None:
    response = products_client.get("/api/v1/products")

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 2
    assert [product["id"] for product in payload["items"]] == [
        "mens-blue-kaftan",
        "womens-printed-kaftan",
    ]


def test_list_products_filters_by_category(products_client: TestClient) -> None:
    response = products_client.get(
        "/api/v1/products",
        params={"category": "mens-fashion"},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 1
    assert payload["items"][0]["id"] == "mens-blue-kaftan"


def test_list_products_supports_bounded_offset_pagination(
    products_client: TestClient,
) -> None:
    response = products_client.get(
        "/api/v1/products",
        params={"limit": 1, "offset": 1},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 2
    assert payload["limit"] == 1
    assert payload["offset"] == 1
    assert len(payload["items"]) == 1


def test_get_product_returns_published_product_details(
    products_client: TestClient,
) -> None:
    response = products_client.get("/api/v1/products/mens-blue-kaftan")

    assert response.status_code == 200
    payload = response.json()
    assert payload["id"] == "mens-blue-kaftan"
    assert payload["category"] == "mens-fashion"
    assert payload["price_sle"] == "1250.00"
    assert payload["image_path"] == "assets/menswear/blue-kaftan.jpg"
    assert "created_at" in payload
    assert "updated_at" in payload


@pytest.mark.parametrize("product_id", ["does-not-exist", "unpublished-reference"])
def test_get_product_hides_unknown_and_unpublished_products(
    products_client: TestClient,
    product_id: str,
) -> None:
    response = products_client.get(f"/api/v1/products/{product_id}")

    assert response.status_code == 404
    assert response.json() == {"detail": "Product not found"}


@pytest.mark.parametrize(
    "params",
    [
        {"category": "children"},
        {"limit": 0},
        {"limit": 101},
        {"offset": -1},
    ],
)
def test_list_products_rejects_invalid_parameters(
    products_client: TestClient,
    params: dict[str, str | int],
) -> None:
    response = products_client.get("/api/v1/products", params=params)

    assert response.status_code == 422
