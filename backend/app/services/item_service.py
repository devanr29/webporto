"""Business logic layer — keeps routers thin."""
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException, status
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate, PaginatedItems

def get_all(db: Session, skip: int = 0, limit: int = 100) -> PaginatedItems:
    total = db.query(func.count(Item.id)).scalar()
    items = db.query(Item).order_by(Item.created_at.desc()).offset(skip).limit(limit).all()
    return PaginatedItems(items=items, total=total, skip=skip, limit=limit)

def get_by_id(db: Session, item_id: int) -> Item:
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found",
        )
    return item

def create(db: Session, payload: ItemCreate) -> Item:
    item = Item(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update(db: Session, item_id: int, payload: ItemUpdate) -> Item:
    item = get_by_id(db, item_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item

def delete(db: Session, item_id: int) -> dict:
    item = get_by_id(db, item_id)
    db.delete(item)
    db.commit()
    return {"message": f"Item {item_id} deleted successfully"}
