# 🎯 Inventory AI Bootcamp - Complete Integration Setup

This is a full-stack inventory management system with **React frontend** and **FastAPI backend**, fully integrated with a **SQLite database**.

## ✅ What's Integrated

- **Database**: SQLite with SQLAlchemy ORM
- **Backend API**: FastAPI with full CRUD operations
- **Frontend**: React with real-time API integration
- **Components Updated**:
  - `Items.tsx` - Fetches and displays items from database
  - `ItemDetail.tsx` - Create, edit, and delete items

## 📋 Quick Start

### Option 1: Auto-Start (Windows)

Double-click: `start.bat`

### Option 2: Auto-Start (Mac/Linux)

```bash
chmod +x start.sh
./start.sh
```

### Option 3: Manual Start

**Terminal 1 - Backend:**

```bash
cd backend
pip install -r requirements.txt
python main.py
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**

## 📊 Architecture

```
Frontend (React)           Backend (FastAPI)          Database (SQLite)
─────────────────          ────────────────           ─────────────────
Items Component     ──→    GET /items/        ──→    items table
ItemDetail Comp     ──→    POST /items/       ──→    Create rows
                    ──→    PUT /items/{id}    ──→    Update rows
                    ──→    DELETE /items/{id} ──→    Delete rows
                    ──→    /categories/       ──→    categories table
                    ──→    /users/            ──→    users table
```

## 🗄️ Database Schema

### Items Table

```sql
CREATE TABLE items (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    quantity INTEGER NOT NULL,
    category_id INTEGER FOREIGN KEY,
    created_at DATETIME,
    updated_at DATETIME
);
```

### Categories Table

```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    description TEXT,
    created_at DATETIME
);
```

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(150) UNIQUE,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    is_active BOOLEAN,
    created_at DATETIME
);
```

## 🔌 API Endpoints

### Items

| Method | Endpoint      | Description     |
| ------ | ------------- | --------------- |
| GET    | `/items/`     | List all items  |
| GET    | `/items/{id}` | Get item by ID  |
| POST   | `/items/`     | Create new item |
| PUT    | `/items/{id}` | Update item     |
| DELETE | `/items/{id}` | Delete item     |

### Categories

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/categories/`     | List all categories |
| GET    | `/categories/{id}` | Get category by ID  |
| POST   | `/categories/`     | Create new category |
| PUT    | `/categories/{id}` | Update category     |
| DELETE | `/categories/{id}` | Delete category     |

### Users

| Method | Endpoint      | Description     |
| ------ | ------------- | --------------- |
| GET    | `/users/`     | List all users  |
| GET    | `/users/{id}` | Get user by ID  |
| POST   | `/users/`     | Create new user |
| PUT    | `/users/{id}` | Update user     |
| DELETE | `/users/{id}` | Delete user     |

## 📝 Example API Usage

### Create an Item

```bash
curl -X POST http://localhost:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro",
    "description": "High-performance laptop",
    "price": 2499.99,
    "quantity": 5,
    "category_id": 1
  }'
```

### List All Items

```bash
curl http://localhost:8000/items/
```

### Get Item by ID

```bash
curl http://localhost:8000/items/1
```

### Update Item

```bash
curl -X PUT http://localhost:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro (Updated)",
    "quantity": 10
  }'
```

### Delete Item

```bash
curl -X DELETE http://localhost:8000/items/1
```

## 📂 Project Structure

```
Inventory-ai-bootcamp/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── db.py                # Database config
│   ├── models.py            # Pydantic schemas
│   ├── orm_models.py        # SQLAlchemy models
│   ├── requirements.txt      # Python dependencies
│   ├── routes/
│   │   ├── items.py         # Items API
│   │   ├── categories.py    # Categories API
│   │   └── users.py         # Users API
│   └── venv/                # Virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts       # API client (NEW)
│   │   ├── app/
│   │   │   ├── App.tsx
│   │   │   └── components/
│   │   │       ├── Items.tsx (UPDATED)
│   │   │       ├── ItemDetail.tsx (UPDATED)
│   │   │       └── ...
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── node_modules/
│
├── INTEGRATION_GUIDE.md      # Detailed integration guide
├── README.md                 # This file
├── start.bat                 # Auto-start script (Windows)
├── start.sh                  # Auto-start script (Mac/Linux)
└── inventory.db              # SQLite database (auto-created)
```

## 🚀 Key Features

✅ **Real-time Data Sync** - Frontend fetches data from API  
✅ **Full CRUD Operations** - Create, Read, Update, Delete items  
✅ **Database Persistence** - All data stored in SQLite  
✅ **Error Handling** - Comprehensive error messages  
✅ **Loading States** - UI feedback during API calls  
✅ **CORS Enabled** - Frontend can communicate with backend  
✅ **Auto-schema Creation** - Database tables created automatically

## 🛠️ Technologies

### Backend

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Material-UI Icons** - Icons

## 🔍 Testing

### Access API Documentation

Open browser: **http://localhost:8000/docs**

This gives you an interactive Swagger UI to test all endpoints!

### Create Sample Data

1. Open: http://localhost:8000/docs
2. Click on `POST /categories/`
3. Click "Try it out"
4. Enter:

```json
{
  "name": "Electronics",
  "description": "Electronic items"
}
```

5. Click "Execute"

Repeat for items and other data.

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if Python is installed
python --version

# Check if port 8000 is in use
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows
```

### Frontend won't connect to backend

- Ensure backend is running: `http://localhost:8000`
- Check browser console for errors
- Verify CORS is configured in `backend/main.py`

### Port already in use

```bash
# Backend on different port
python -m uvicorn main:app --port 8001

# Update frontend: frontend/src/services/api.ts
# Change: API_BASE_URL = 'http://localhost:8001'
```

### Database issues

```bash
# Delete old database to reset
rm backend/inventory.db  # Mac/Linux
del backend\inventory.db  # Windows

# Restart backend to recreate tables
```

## 📚 Files Created/Modified

### New Files

- ✨ `frontend/src/services/api.ts` - API client service
- 📄 `INTEGRATION_GUIDE.md` - Detailed integration guide
- 🚀 `start.bat` - Windows quick start
- 🚀 `start.sh` - Mac/Linux quick start

### Modified Files

- 📝 `frontend/src/app/components/Items.tsx` - Now fetches from API
- 📝 `frontend/src/app/components/ItemDetail.tsx` - Full CRUD support
- 🔧 `backend/main.py` - Added CORS for port 5173

## 🎓 Next Steps

1. **Test the integration**
   - Start both servers
   - Create items via frontend
   - Edit and delete items
   - Verify data persists in database

2. **Update other components**
   - Dashboard - Show summary stats from database
   - Locations - Implement location management
   - Login - Add authentication

3. **Add features**
   - Search and filtering
   - Pagination
   - File upload (images)
   - Reports and analytics

4. **Deploy**
   - Backend to Heroku/Railway
   - Frontend to Vercel/Netlify
   - Database migration to PostgreSQL

## 📖 API Service Usage in Components

```typescript
import { itemsAPI, categoriesAPI } from "../../services/api";

// Fetch items
const items = await itemsAPI.getAll();

// Get single item
const item = await itemsAPI.getById(1);

// Create item
await itemsAPI.create({
  name: "Item Name",
  price: 99.99,
  quantity: 5,
  category_id: 1,
});

// Update item
await itemsAPI.update(1, {
  name: "Updated Name",
  quantity: 10,
});

// Delete item
await itemsAPI.delete(1);
```

## 🔐 Security Notes

⚠️ **Current Setup** (Development Only)

- CORS allows all methods and headers
- No authentication yet
- Database is local SQLite

✅ **Before Production**

- Add JWT authentication
- Implement proper CORS settings
- Switch to PostgreSQL
- Add input validation
- Implement rate limiting
- Add HTTPS
- Use environment variables for secrets

## 📞 Support

For detailed information, see:

- `INTEGRATION_GUIDE.md` - Complete integration walkthrough
- `backend/main.py` - FastAPI setup
- `frontend/src/services/api.ts` - API client implementation

---

**🎉 You now have a fully integrated frontend, backend, and database!**

Happy coding! 🚀
