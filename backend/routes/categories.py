from fastapi import APIRouter, Depends, HTTPException
from models import Category as CategorySchema
from db import get_db

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def list_categories(db=Depends(get_db)):
    cats = db["categories"].find({})
    return {"categories": [{"id": c.get("id"), "name": c.get("name"), "description": c.get("description")} for c in cats]}


@router.get("/{category_id}")
def get_category(category_id: int, db=Depends(get_db)):
    c = db["categories"].find_one({"id": category_id})
    if not c:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"category_id": c.get("id"), "name": c.get("name"), "description": c.get("description")}


@router.post("/")
def create_category(category: CategorySchema, db=Depends(get_db)):
    from pymongo import ReturnDocument
    # Get next integer ID
    counter = db["counters"].find_one_and_update(
        {"_id": "category_id"},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    new_id = counter["sequence_value"]

    db_cat = {"id": new_id, "name": category.name, "description": category.description}
    db["categories"].insert_one(db_cat)
    return {"created": {"id": db_cat["id"], "name": db_cat["name"], "description": db_cat["description"]}}


@router.put("/{category_id}")
def update_category(category_id: int, category: CategorySchema, db=Depends(get_db)):
    c = db["categories"].find_one({"id": category_id})
    if not c:
        raise HTTPException(status_code=404, detail="Category not found")
    db["categories"].update_one({"id": category_id}, {"$set": {"name": category.name, "description": category.description}})
    return {"updated": {"id": category_id, "name": category.name}, "category_id": category_id}


@router.delete("/{category_id}")
def delete_category(category_id: int, db=Depends(get_db)):
    result = db["categories"].delete_one({"id": category_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"deleted": category_id}
