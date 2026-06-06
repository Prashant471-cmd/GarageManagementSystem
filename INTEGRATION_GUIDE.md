# Inventory System - Integration Guide

## Project Structure

```
backend/           # FastAPI server
├── main.py        # Main server file
├── db.py          # Database configuration (SQLite)
├── models.py      # Pydantic schemas
├── orm_models.py  # SQLAlchemy ORM models
├── requirements.txt
└── routes/        # API endpoints
    ├── items.py
    ├── categories.py
    └── users.py

frontend/          # React + TypeScript app
├── src/
│   ├── services/
│   │   └── api.ts # API client service
│   └── app/
│       ├── App.tsx
│       └── components/
│           ├── Items.tsx (Updated - fetches from API)
│           └── ItemDetail.tsx (Updated - CRUD operations)
```

## Database Setup

### Backend Database

The backend uses **SQLite** (`inventory.db`). No external database installation is needed!

**Database Tables:**

- `categories` - Product categories
- `items` - Inventory items
- `users` - System users

Tables are automatically created when the server starts.

## Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** and **npm/pnpm** (for frontend)

## Backend Setup & Run

### Step 1: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Requirements:**

- FastAPI 0.104.1
- Uvicorn (ASGI server)
- SQLAlchemy 2.0.49 (ORM)
- Pydantic 2.5.0 (Data validation)

### Step 2: Run Backend Server

```bash
cd backend
python main.py
```

Or using uvicorn directly:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**

```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ Backend is running at: `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs` (Interactive Swagger UI)

## Frontend Setup & Run

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install  # or pnpm install
```

### Step 2: Run Frontend Development Server

```bash
cd frontend
npm run dev  # or pnpm dev
```

**Expected Output:**

```
VITE v4.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

✅ Frontend is running at: `http://localhost:5173`

## Integration - How It Works

### API Client Service

Created: `frontend/src/services/api.ts`

This service handles all communication between frontend and backend:

```typescript
// Fetch all items
const items = await itemsAPI.getAll();

// Create a new item
const newItem = await itemsAPI.create({
  name: "Item Name",
  description: "Description",
  price: 99.99,
  quantity: 10,
  category_id: 1,
});

// Update an item
await itemsAPI.update(itemId, updatedData);

// Delete an item
await itemsAPI.delete(itemId);
```

### Frontend Components

**Items.tsx (Updated)**

- ✅ Fetches items from API on component load
- ✅ Displays loading and error states
- ✅ Real-time data from database
- ✅ Filters and search functionality

**ItemDetail.tsx (Updated)**

- ✅ Create new items (POST)
- ✅ Edit existing items (PUT)
- ✅ Delete items (DELETE)
- ✅ Fetch category data for dropdown
- ✅ Form validation and error handling

### CORS Configuration

Backend CORS is configured to allow requests from:

```
http://localhost:3000  (Note: Update to 5173 if needed)
http://localhost:5173  (Vite default port)
```

**To update CORS in backend:**
Edit `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing the Integration

### 1. Start Both Servers

**Terminal 1 (Backend):**

```bash
cd backend
python main.py
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

### 2. Access Frontend

Open browser: `http://localhost:5173`

### 3. Test API Endpoints

**List Items:**

```bash
curl http://localhost:8000/items/
```

**Create Item:**

```bash
curl -X POST http://localhost:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "description": "A test item",
    "price": 29.99,
    "quantity": 5,
    "category_id": null
  }'
```

**List Categories:**

```bash
curl http://localhost:8000/categories/
```

**List Users:**

```bash
curl http://localhost:8000/users/
```

### 4. Create Sample Data (Optional)

Use the API documentation UI or curl to create test data:

**Add a Category:**

```bash
curl -X POST http://localhost:8000/categories/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "description": "Electronic items"
  }'
```

**Add an Item:**

```bash
curl -X POST http://localhost:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro 16",
    "description": "High-performance laptop",
    "price": 2499.99,
    "quantity": 5,
    "category_id": 1
  }'
```

## Database File Location

The SQLite database is created at:

```
backend/inventory.db
```

You can inspect it with any SQLite client:

```bash
sqlite3 backend/inventory.db

# View all items
sqlite> SELECT * FROM items;

# View all categories
sqlite> SELECT * FROM categories;
```

## Common Issues & Solutions

### Issue: "Connection refused" when frontend tries to fetch

**Solution:**

- Ensure backend is running on `http://localhost:8000`
- Check CORS configuration in `backend/main.py`
- Check browser console for exact error

### Issue: "No items showing in frontend"

**Solution:**

- Create items via API first (see "Create Sample Data" above)
- Check network tab in browser DevTools
- Verify database file exists: `backend/inventory.db`

### Issue: Port 8000 already in use

**Solution:**

```bash
# Use different port
uvicorn main:app --port 8001
# Update api.ts: API_BASE_URL = 'http://localhost:8001'
```

### Issue: Port 5173 already in use

**Solution:**

```bash
cd frontend
npm run dev -- --port 5174
```

## Next Steps

1. ✅ **Database Integration** - Complete
2. ✅ **API Service Layer** - Complete
3. ✅ **Frontend Components** - Updated for CRUD
4. **Authentication** - Add login/JWT tokens
5. **More Components** - Update Dashboard, Locations, etc.
6. **Validation** - Add more form validation
7. **Error Handling** - Enhance error messages
8. **Testing** - Add unit and integration tests

## API Endpoints Reference

### Items

- `GET /items/` - List all items
- `GET /items/{id}` - Get item by ID
- `POST /items/` - Create new item
- `PUT /items/{id}` - Update item
- `DELETE /items/{id}` - Delete item

### Categories

- `GET /categories/` - List all categories
- `GET /categories/{id}` - Get category by ID
- `POST /categories/` - Create category
- `PUT /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category

### Users

- `GET /users/` - List all users
- `GET /users/{id}` - Get user by ID
- `POST /users/` - Create user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│         React Frontend (Port 5173)              │
│  ┌──────────────────────────────────────────┐   │
│  │  Components:                             │   │
│  │  - Items (fetches from API)              │   │
│  │  - ItemDetail (CRUD)                     │   │
│  │  - Dashboard, Locations, etc.            │   │
│  └──────────────────────────────────────────┘   │
│            ↓ (HTTP Requests)                    │
│  ┌──────────────────────────────────────────┐   │
│  │  API Service (api.ts)                    │   │
│  │  - itemsAPI.getAll()                     │   │
│  │  - itemsAPI.create()                     │   │
│  │  - itemsAPI.update()                     │   │
│  │  - itemsAPI.delete()                     │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                    ↓ (REST API)
            ────────────────────────────────────
                    ↑ (JSON Response)
┌─────────────────────────────────────────────────┐
│      FastAPI Backend (Port 8000)                │
│  ┌──────────────────────────────────────────┐   │
│  │  Routes:                                 │   │
│  │  - /items/   (CRUD operations)           │   │
│  │  - /categories/ (CRUD operations)        │   │
│  │  - /users/   (CRUD operations)           │   │
│  └──────────────────────────────────────────┘   │
│            ↓ (SQL Queries)                      │
│  ┌──────────────────────────────────────────┐   │
│  │  SQLAlchemy ORM                          │   │
│  │  - Models (Item, Category, User)         │   │
│  └──────────────────────────────────────────┘   │
│            ↓ (Database Operations)              │
│  ┌──────────────────────────────────────────┐   │
│  │  SQLite Database (inventory.db)          │   │
│  │  - items table                           │   │
│  │  - categories table                      │   │
│  │  - users table                           │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

**Happy Inventory Management! 🎉**
