from fastapi import APIRouter, Depends, HTTPException
from models import User as UserSchema
from db import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def list_users(db=Depends(get_db)):
    users = db["users"].find({})
    return {"users": [{"id": u.get("id"), "username": u.get("username"), "email": u.get("email")} for u in users]}


@router.get("/{user_id}")
def get_user(user_id: int, db=Depends(get_db)):
    u = db["users"].find_one({"id": user_id})
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": u.get("id"), "username": u.get("username"), "email": u.get("email")}


@router.post("/")
def create_user(user: UserSchema, db=Depends(get_db)):
    from pymongo import ReturnDocument
    # Get next integer ID
    counter = db["counters"].find_one_and_update(
        {"_id": "user_id"},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    new_id = counter["sequence_value"]

    db_user = {
        "id": new_id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "is_active": user.is_active
    }
    db["users"].insert_one(db_user)
    return {"created": {"id": db_user["id"], "username": db_user["username"], "email": db_user["email"]}}


@router.put("/{user_id}")
def update_user(user_id: int, user: UserSchema, db=Depends(get_db)):
    u = db["users"].find_one({"id": user_id})
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    db["users"].update_one(
        {"id": user_id},
        {"$set": {
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "is_active": user.is_active
        }}
    )
    return {"updated": {"id": user_id, "username": user.username}, "user_id": user_id}


@router.delete("/{user_id}")
def delete_user(user_id: int, db=Depends(get_db)):
    result = db["users"].delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"deleted": user_id}
