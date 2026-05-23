#!/bin/bash
# FoodDash Quick Start Script

echo "🍔 Starting FoodDash..."

# Start backend
echo "▶ Starting FastAPI backend on port 8000..."
cd backend
pip install -r requirements.txt -q
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for backend
sleep 2

# Start frontend
echo "▶ Starting Next.js frontend on port 3000..."
cd frontend
npm install --silent
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ FoodDash is running!"
echo "   Frontend: http://localhost:3000"
echo "   API docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait and cleanup
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Stopped.'" EXIT
wait
