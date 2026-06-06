from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Category(BaseModel):
    """Category model"""
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Item(BaseModel):
    """Item model"""
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    price: float
    quantity: int
    category_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class User(BaseModel):
    """User model"""
    id: Optional[int] = None
    username: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
