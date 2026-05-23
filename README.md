# 🍔 FoodDash — Online Food Delivery App

A full-stack food delivery application built with **Python (FastAPI)** backend and **Next.js** frontend.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| Auth | JWT (python-jose), bcrypt (passlib) |
| State | React Context API |
| Styling | CSS Variables, Google Fonts (Syne + DM Sans) |

## Project Structure

```
food-app/
├── backend/
│   ├── main.py          # FastAPI app — all routes & logic
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx              # Home — restaurant listing
    │   │   ├── restaurant/[id]/      # Restaurant menu page
    │   │   ├── cart/                 # Cart + checkout
    │   │   ├── orders/               # Order history
    │   │   ├── layout.tsx            # Root layout
    │   │   └── globals.css           # Global styles
    │   ├── components/
    │   │   ├── Navbar.tsx            # Navigation bar
    │   │   └── AuthModal.tsx         # Login/register modal
    │   ├── context/
    │   │   └── providers.tsx         # Auth + Cart context
    │   └── lib/
    │       └── api.ts                # API client
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.ts
    └── tsconfig.json
```

## Features

- 🏪 **Browse restaurants** — search & filter by cuisine
- 🍽️ **Menu pages** — view items by category, add/remove from cart
- 🛒 **Cart** — real-time quantity controls, order summary
- ✅ **Checkout** — address input, payment method selection (COD/UPI/Card)
- 📦 **Order history** — view all past orders with status
- 🔐 **Auth** — register/login with JWT, persistent sessions

## Setup & Run

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

App runs at: http://localhost:3000

### Environment Variables (optional)

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login (returns JWT) |
| GET | `/auth/me` | Get current user |
| GET | `/restaurants` | List all restaurants |
| GET | `/restaurants/{id}` | Restaurant details |
| GET | `/restaurants/{id}/menu` | Restaurant menu |
| GET | `/cart` | Get cart |
| POST | `/cart/add` | Add item to cart |
| DELETE | `/cart/clear` | Clear cart |
| POST | `/orders` | Place order |
| GET | `/orders` | Order history |

## Data (In-Memory)

The backend uses in-memory storage (resets on restart). For production, replace with:
- **PostgreSQL** + SQLAlchemy ORM
- **Redis** for cart/sessions

## Author

Subhankar Deb — Capstone Project, Lovely Professional University 2025
