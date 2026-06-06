from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import items, categories, users

app = FastAPI(
    title="Inventory System",
    description="API for managing inventory items, categories, and users",
    version="1.0.0"
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
