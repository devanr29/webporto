from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    # App
    APP_NAME: str = "My App"
    APP_DESCRIPTION: str = "A general purpose web application API"
    VERSION: str = "0.1.0"
    DEBUG: bool = False

    # Database — defaults to SQLite, swap to Postgres by setting env var
    DATABASE_URL: str = "sqlite:///./app.db"

    # Security
    SECRET_KEY: str = "change-this-in-production"

    # CORS — list the origins your frontend runs on
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
