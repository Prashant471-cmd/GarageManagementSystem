from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User as UserSchema
from orm_models import User as UserORM
from db import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def list_users(db: Session = Depends(get_db)):
    users = db.query(UserORM).all()
    return {"users": [{"id": u.id, "username": u.username, "email": u.email} for u in users]}


@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    u = db.get(UserORM, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": u.id, "username": u.username, "email": u.email}


@router.post("/")
def create_user(user: UserSchema, db: Session = Depends(get_db)):
    db_user = UserORM(username=user.username, email=user.email, full_name=user.full_name, is_active=user.is_active)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"created": {"id": db_user.id, "username": db_user.username, "email": db_user.email}}


@router.put("/{user_id}")
def update_user(user_id: int, user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.get(UserORM, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = user.username
    db_user.email = user.email
    db_user.full_name = user.full_name
    db_user.is_active = user.is_active
    db.commit()
    db.refresh(db_user)
    return {"updated": {"id": db_user.id, "username": db_user.username}, "user_id": db_user.id}


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.get(UserORM, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"deleted": user_id}
