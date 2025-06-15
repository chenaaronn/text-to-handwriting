from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Text to Handwriting API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # JWT Settings
    SECRET_KEY: str = "your-secret-key-here"  # Change this in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Supabase Settings
    SUPABASE_URL: str = "your-supabase-url"
    SUPABASE_KEY: str = "your-supabase-key"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 