from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase credentials in environment variables")

supabase = create_client(supabase_url, supabase_key)

def test_connection():
    try:
        # Try to fetch a single row from profiles table
        response = supabase.table('profiles').select("*").limit(1).execute()
        return {"status": "success", "message": "Successfully connected to Supabase"}
    except Exception as e:
        return {"status": "error", "message": f"Failed to connect to Supabase: {str(e)}"} 