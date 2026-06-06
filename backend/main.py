from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import items, categories, users
from db import create_tables
# ensure ORM models are imported so their tables are registered
import orm_models  # noqa: F401

# create tables at import time to avoid missing-table errors when using uvicorn
create_tables()

app = FastAPI(
    title="Inventory System",
    description="API for managing inventory items, categories, and users",
    version="1.0.0"
)


@app.on_event("startup")
def on_startup():
    create_tables()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(items.router)
app.include_router(categories.router)
app.include_router(users.router)


@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Inventory System API"}


if __name__ == "__main__":
    import uvicorn
    # create DB tables if they don't exist, then run
    create_tables()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
