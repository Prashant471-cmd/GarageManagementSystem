from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Item as ItemSchema
from orm_models import Item as ItemORM
from db import get_db

router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def list_items(db: Session = Depends(get_db)):
    """Get all items"""
    items = db.query(ItemORM).all()
    return {"items": [
        {
            "id": i.id,
            "name": i.name,
            "description": i.description,
            "price": i.price,
            "quantity": i.quantity,
            "category_id": i.category_id,
            "created_at": i.created_at,
            "updated_at": i.updated_at,
        }
        for i in items
    ]}


@router.get("/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific item by ID"""
    item = db.get(ItemORM, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {
        "item_id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "quantity": item.quantity,
        "category_id": item.category_id,
    }


@router.post("/")
def create_item(item: ItemSchema, db: Session = Depends(get_db)):
    """Create a new item"""
    db_item = ItemORM(
        name=item.name,
        description=item.description,
        price=item.price,
        quantity=item.quantity,
        category_id=item.category_id,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"created": {
        "id": db_item.id,
        "name": db_item.name,
        "description": db_item.description,
        "price": db_item.price,
        "quantity": db_item.quantity,
        "category_id": db_item.category_id,
        "created_at": db_item.created_at,
        "updated_at": db_item.updated_at,
    }}


@router.put("/{item_id}")
def update_item(item_id: int, item: ItemSchema, db: Session = Depends(get_db)):
    """Update an existing item"""
    db_item = db.get(ItemORM, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db_item.name = item.name
    db_item.description = item.description
    db_item.price = item.price
    db_item.quantity = item.quantity
    db_item.category_id = item.category_id
    db.commit()
    db.refresh(db_item)
    return {"updated": {
        "id": db_item.id,
        "name": db_item.name,
        "description": db_item.description,
        "price": db_item.price,
        "quantity": db_item.quantity,
        "category_id": db_item.category_id,
    }, "item_id": db_item.id}


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Delete an item"""
    db_item = db.get(ItemORM, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"deleted": item_id}
