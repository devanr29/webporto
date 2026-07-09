from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.item import ItemCreate, ItemUpdate, ItemResponse, PaginatedItems
from app.services import item_service

router = APIRouter()

@router.get("/", response_model=PaginatedItems)
def list_items(
    skip:  int = Query(0,   ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
):
    """List all items with pagination."""
    return item_service.get_all(db, skip=skip, limit=limit)

@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(payload: ItemCreate, db: Session = Depends(get_db)):
    """Create a new item."""
    return item_service.create(db, payload)

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    """Get a single item by ID."""
    return item_service.get_by_id(db, item_id)

@router.patch("/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, payload: ItemUpdate, db: Session = Depends(get_db)):
    """Partially update an item."""
    return item_service.update(db, item_id, payload)

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Delete an item by ID."""
    return item_service.delete(db, item_id)
