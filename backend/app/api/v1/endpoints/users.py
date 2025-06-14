from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Pydantic models for request/response
class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

class UserResponse(UserBase):
    id: str

# Example endpoints
@router.get("/", response_model=List[UserResponse])
async def get_users():
    """Get all users"""
    # This is a dummy response - in reality, you'd fetch from database
    return [
        UserResponse(id="1", name="John Doe", email="john@example.com"),
        UserResponse(id="2", name="Jane Smith", email="jane@example.com")
    ]

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    """Get a specific user by ID"""
    # Dummy response
    return UserResponse(id=user_id, name="John Doe", email="john@example.com")

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Create a new user"""
    # In reality, you'd save to database
    return UserResponse(id="3", name=user.name, email=user.email)

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user: UserUpdate):
    """Update a user"""
    # Dummy response
    return UserResponse(
        id=user_id,
        name=user.name or "John Doe",
        email=user.email or "john@example.com"
    )

@router.delete("/{user_id}")
async def delete_user(user_id: str):
    """Delete a user"""
    return {"message": f"User {user_id} deleted"} 