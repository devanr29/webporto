# Backend — FastAPI

## Stack
- **FastAPI** — web framework
- **SQLAlchemy 2.0** — ORM
- **Pydantic v2** — validation & settings
- **SQLite** (default) — swap to Postgres via `DATABASE_URL`

## Setup

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # edit as needed
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
- Redoc: http://localhost:8000/redoc

## Project Structure

```
app/
├── main.py          # app factory, middleware, router registration
├── config.py        # settings (reads from .env)
├── database.py      # SQLAlchemy engine, session, Base
├── models/          # SQLAlchemy table definitions
├── schemas/         # Pydantic request/response schemas
├── services/        # business logic (called by routers)
└── routers/         # thin HTTP layer (calls services)
```

## Replacing the Example Resource

The template ships with a generic `Item` resource. To add your own:
1. Add a model in `models/`
2. Add schemas in `schemas/`
3. Add service functions in `services/`
4. Add a router in `routers/` and register it in `main.py`
