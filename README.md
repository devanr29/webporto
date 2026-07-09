# Full-Stack Web App Template

React (Vite) frontend + FastAPI backend, ready to clone and build on.

## Quick Start

### 1 — Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # edit if needed
uvicorn app.main:app --reload
```

- API running at **http://localhost:8000**
- Interactive docs at **http://localhost:8000/docs**

### 2 — Frontend

```bash
cd frontend
npm install
cp .env.example .env          # edit if needed
npm run dev
```

- App running at **http://localhost:5173**

---

## Project Structure

```
webapp-template/
│
├── backend/
│   ├── app/
│   │   ├── main.py          ← app factory, middleware, router registration
│   │   ├── config.py        ← all settings (reads .env)
│   │   ├── database.py      ← SQLAlchemy engine + session dependency
│   │   ├── models/          ← table definitions (SQLAlchemy)
│   │   ├── schemas/         ← request/response validation (Pydantic)
│   │   ├── services/        ← business logic
│   │   └── routers/         ← thin HTTP layer
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── App.jsx           ← router setup
    │   ├── index.css         ← design system + global styles
    │   ├── context/          ← AppContext (user, notifications)
    │   ├── services/         ← Axios instance + API methods
    │   ├── hooks/            ← useApi, useMutation
    │   ├── components/
    │   │   ├── ui/           ← Button, Input, Card
    │   │   └── layout/       ← Navbar
    │   └── pages/            ← Home, Dashboard, NotFound
    ├── package.json
    └── .env.example
```

## Customising the Template

**Rename the resource** — the template ships with a generic `Item`.
To add your own resource (e.g. `User`, `Post`, `Order`):

**Backend:**
1. Add a model in `backend/app/models/`
2. Add Pydantic schemas in `backend/app/schemas/`
3. Add service functions in `backend/app/services/`
4. Add a router in `backend/app/routers/` and register it in `main.py`

**Frontend:**
1. Add an API object to `frontend/src/services/api.js`
2. Create a page in `frontend/src/pages/`
3. Add a route in `frontend/src/App.jsx`
4. Add a nav link in `frontend/src/components/layout/Navbar.jsx`

## Switching to Postgres

```env
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

```bash
pip install psycopg2-binary
```

That's it — SQLAlchemy handles the rest.
