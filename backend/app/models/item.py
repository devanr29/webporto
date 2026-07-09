from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from app.database import Base

class Item(Base):
    __tablename__ = "items"

    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String(255), nullable=False)
    description = Column(String, nullable=True)
    is_active   = Column(Boolean, default=True, nullable=False)
    created_at  = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at  = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Item id={self.id} title={self.title!r}>"
