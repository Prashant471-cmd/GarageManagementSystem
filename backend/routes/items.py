from fastapi import APIRouter, Depends, HTTPException
from models import Item as ItemSchema
from db import get_db

router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def list_items(db=Depends(get_db)):
    """Get all items"""
    items_cursor = db["items"].find({})
    items_list = []
    for i in items_cursor:
        items_list.append({
            "id": i.get("id"),
            "name": i.get("name"),
            "sku": i.get("sku"),
            "category": i.get("category"),
            "location": i.get("location"),
            "quantity": i.get("quantity"),
            "minQuantity": i.get("minQuantity"),
            "price": i.get("price"),
            "value": i.get("value"),
            "description": i.get("description"),
            "supplier": i.get("supplier"),
            "lastRestocked": i.get("lastRestocked"),
            "category_id": i.get("category_id"),
            "created_at": i.get("created_at"),
            "updated_at": i.get("updated_at"),
        })
    return {"items": items_list}


@router.get("/{item_id}")
def get_item(item_id: int, db=Depends(get_db)):
    """Get a specific item by ID"""
    item = db["items"].find_one({"id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {
        "id": item.get("id"),
        "name": item.get("name"),
        "sku": item.get("sku"),
        "category": item.get("category"),
        "location": item.get("location"),
        "quantity": item.get("quantity"),
        "minQuantity": item.get("minQuantity"),
        "price": item.get("price"),
        "value": item.get("value"),
        "description": item.get("description"),
        "supplier": item.get("supplier"),
        "lastRestocked": item.get("lastRestocked"),
        "category_id": item.get("category_id"),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


@router.post("/")
def create_item(item: ItemSchema, db=Depends(get_db)):
    """Create a new item"""
    from datetime import datetime
    from pymongo import ReturnDocument

    # Get next integer ID
    counter = db["counters"].find_one_and_update(
        {"_id": "item_id"},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    new_id = counter["sequence_value"]

    # Aligns price and value
    price_val = item.price if item.price is not None else (item.value if item.value is not None else 0.0)
    value_val = item.value if item.value is not None else (item.price if item.price is not None else 0.0)

    now = datetime.utcnow()
    db_item = {
        "id": new_id,
        "name": item.name,
        "sku": item.sku,
        "category": item.category,
        "location": item.location,
        "quantity": item.quantity,
        "minQuantity": item.minQuantity,
        "price": price_val,
        "value": value_val,
        "description": item.description,
        "supplier": item.supplier,
        "lastRestocked": item.lastRestocked,
        "category_id": item.category_id,
        "created_at": now,
        "updated_at": now,
    }
    db["items"].insert_one(db_item)
    return {"created": {
        "id": db_item["id"],
        "name": db_item["name"],
        "sku": db_item["sku"],
        "category": db_item["category"],
        "location": db_item["location"],
        "quantity": db_item["quantity"],
        "minQuantity": db_item["minQuantity"],
        "price": db_item["price"],
        "value": db_item["value"],
        "description": db_item["description"],
        "supplier": db_item["supplier"],
        "lastRestocked": db_item["lastRestocked"],
        "category_id": db_item["category_id"],
        "created_at": db_item["created_at"],
        "updated_at": db_item["updated_at"],
    }}


@router.put("/{item_id}")
def update_item(item_id: int, item: ItemSchema, db=Depends(get_db)):
    """Update an existing item"""
    from datetime import datetime
    db_item = db["items"].find_one({"id": item_id})
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Aligns price and value
    price_val = item.price if item.price is not None else (item.value if item.value is not None else 0.0)
    value_val = item.value if item.value is not None else (item.price if item.price is not None else 0.0)

    update_data = {
        "name": item.name,
        "sku": item.sku,
        "category": item.category,
        "location": item.location,
        "quantity": item.quantity,
        "minQuantity": item.minQuantity,
        "price": price_val,
        "value": value_val,
        "description": item.description,
        "supplier": item.supplier,
        "lastRestocked": item.lastRestocked,
        "category_id": item.category_id,
        "updated_at": datetime.utcnow(),
    }
    db["items"].update_one({"id": item_id}, {"$set": update_data})

    return {"updated": {
        "id": item_id,
        "name": item.name,
        "sku": item.sku,
        "category": item.category,
        "location": item.location,
        "quantity": item.quantity,
        "minQuantity": item.minQuantity,
        "price": price_val,
        "value": value_val,
        "description": item.description,
        "supplier": item.supplier,
        "lastRestocked": item.lastRestocked,
        "category_id": item.category_id,
    }, "item_id": item_id}


@router.delete("/{item_id}")
def delete_item(item_id: int, db=Depends(get_db)):
    """Delete an item"""
    result = db["items"].delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"deleted": item_id}
