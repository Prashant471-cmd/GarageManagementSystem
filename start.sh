#!/bin/bash

# Quick Start Script for Inventory System
# This script starts both backend and frontend servers

echo "========================================"
echo "   INVENTORY SYSTEM - QUICK START"
echo "========================================"
echo ""

# Check if we're in the correct directory
if [ ! -d "backend" ]; then
    echo "Error: backend folder not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "Error: frontend folder not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "Step 1: Setting up Backend..."

cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python packages..."
pip install -r requirements.txt > /dev/null 2>&1

cd ..
echo "✓ Backend ready"

echo ""
echo "Step 2: Setting up Frontend..."

cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install > /dev/null 2>&1
fi

cd ..
echo "✓ Frontend ready"

echo ""
echo "========================================"
echo "Starting servers..."
echo "========================================"
echo ""
echo "Backend will start on: http://localhost:8000"
echo "Frontend will start on: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""

# Start backend in background
echo "Starting Backend..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend
echo "Starting Frontend..."
cd frontend
npm run dev
cd ..

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
