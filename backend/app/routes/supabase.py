from fastapi import APIRouter
from app.utils.supabase import test_connection

router = APIRouter()

@router.get("/test-connection")
async def test_supabase_connection():
    return test_connection() 