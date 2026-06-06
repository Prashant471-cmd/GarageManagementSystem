from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Category as CategorySchema
from orm_models import Category as CategoryORM
from db import get_db

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def list_categories(db: Session = Depends(get_db)):
    cats = db.query(CategoryORM).all()
    return {"categories": [{"id": c.id, "name": c.name, "description": c.description} for c in cats]}


@router.get("/{category_id}")
def get_category(category_id: int, db: Session = Depends(get_db)):
    c = db.get(CategoryORM, category_id)
    if not c:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"category_id": c.id, "name": c.name, "description": c.description}


@router.post("/")
def create_category(category: CategorySchema, db: Session = Depends(get_db)):
    db_cat = CategoryORM(name=category.name, description=category.description)
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return {"created": {"id": db_cat.id, "name": db_cat.name, "description": db_cat.description}}


@router.put("/{category_id}")
def update_category(category_id: int, category: CategorySchema, db: Session = Depends(get_db)):
    db_cat = db.get(CategoryORM, category_id)
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db_cat.name = category.name
    db_cat.description = category.description
    db.commit()
    db.refresh(db_cat)
    return {"updated": {"id": db_cat.id, "name": db_cat.name}, "category_id": db_cat.id}


@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_cat = db.get(CategoryORM, category_id)
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_cat)
    db.commit()
    return {"deleted": category_id}
