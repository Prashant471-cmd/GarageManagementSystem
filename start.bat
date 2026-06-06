@echo off
REM Quick Start Script for Inventory System
REM This script starts both backend and frontend servers

echo ========================================
echo   INVENTORY SYSTEM - QUICK START
echo ========================================
echo.

REM Check if we're in the correct directory
if not exist "backend" (
    echo Error: backend folder not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "frontend" (
    echo Error: frontend folder not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo Step 1: Installing/Checking Backend Dependencies...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
echo Installing Python packages...
pip install -r requirements.txt > nul 2>&1
cd ..
echo ✓ Backend ready

echo.
echo Step 2: Installing/Checking Frontend Dependencies...
cd frontend
if not exist "node_modules" (
    echo Installing npm packages...
    npm install > nul 2>&1
)
cd ..
echo ✓ Frontend ready

echo.
echo ========================================
echo Starting servers...
echo ========================================
echo.
echo Backend will start on: http://localhost:8000
echo Frontend will start on: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Starting Backend (Terminal 1)...
start cmd /k "cd backend && call venv\Scripts\activate.bat && python main.py"

timeout /t 3 /nobreak

echo Starting Frontend (Terminal 2)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ✓ Both servers started!
echo Open http://localhost:5173 in your browser
echo.
pause
