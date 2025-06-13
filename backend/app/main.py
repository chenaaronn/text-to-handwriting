from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import handwriting

app = FastAPI(
    title="HandwriteAI API",
    description="API for handwriting synthesis and manipulation",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(handwriting.router, prefix="/api/handwriting", tags=["handwriting"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to HandwriteAI API",
        "status": "operational",
        "version": "0.1.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 