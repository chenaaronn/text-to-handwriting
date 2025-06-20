from fastapi import APIRouter
from app.api.v1.endpoints import supabase, handwriting, users, auth

api_router = APIRouter()

# Include routers with their prefixes
api_router.include_router(supabase.router, prefix="/supabase", tags=["supabase"])
api_router.include_router(handwriting.router, prefix="/handwriting", tags=["handwriting"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# API v1 package 