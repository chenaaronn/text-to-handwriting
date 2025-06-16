from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models.user import UserCreate, User, Token
from app.utils.supabase import supabase
import logging

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register", response_model=User)
async def register_user(user: UserCreate):
    try:
        # Register user with Supabase Auth
        auth_response = supabase.auth.sign_up(
            email=user.email,
            password=user.password
        )
        print("Auth response:", auth_response)
        
        if auth_response:
            # Create profile in profiles table
            profile_data = {
                "id": str(auth_response.id),  # Convert UUID to string
                "username": user.username,
                "full_name": user.username,  # Using username as full_name initially
                "avatar_url": None
            }
            print("Profile data to be inserted:", profile_data)
            profile_response = supabase.table('profiles').insert(profile_data).execute()
            print("Profile response:", profile_response)
            
            if profile_response.data:
                user_data = User(
                    id=str(auth_response.id),  # Convert UUID to string
                    email=user.email,
                    username=user.username,
                    is_active=True
                )
                print("Returning user data:", user_data.dict())
                return user_data
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create user profile"
        )
    except Exception as e:
        print("Registration error:", str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        # Authenticate with Supabase
        auth_response = supabase.auth.sign_in_with_password(
            email=form_data.username,
            password=form_data.password
        )
        print("Login response:", auth_response)
        
        if auth_response:
            # Create JWT token
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(
                data={"sub": auth_response.email},
                expires_delta=access_token_expires
            )
            return {"access_token": access_token, "token_type": "bearer"}
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        print("Login error:", str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
            headers={"WWW-Authenticate": "Bearer"},
        ) 