from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional

class ItemBase(BaseModel):
    title:       str            = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    is_active:   bool          = True

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    """All fields optional — supports partial updates (PATCH)."""
    title:       Optional[str]  = Field(None, min_length=1, max_length=255)
    description: Optional[str]  = None
    is_active:   Optional[bool] = None

class ItemResponse(ItemBase):
    id:         int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PaginatedItems(BaseModel):
    items: list[ItemResponse]
    total: int
    skip:  int
    limit: int
