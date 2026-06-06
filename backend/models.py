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
    sku: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    quantity: int
    minQuantity: Optional[int] = None
    price: Optional[float] = 0.0
    value: Optional[float] = 0.0
    description: Optional[str] = None
    supplier: Optional[str] = None
    lastRestocked: Optional[str] = None
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
