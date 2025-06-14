from supabase import create_client, Client
from typing import Optional, List
import os
from dotenv import load_dotenv

load_dotenv()

class SupabaseService:
    def __init__(self):
        self.url: str = os.getenv("SUPABASE_URL", "")
        self.key: str = os.getenv("SUPABASE_SERVICE_KEY", "")
        if not self.url or not self.key:
            raise ValueError("Missing Supabase credentials")
        self.client: Client = create_client(self.url, self.key)

    async def upload_file(self, bucket: str, path: str, file_data: bytes) -> str:
        """Upload a file to Supabase Storage."""
        try:
            result = self.client.storage.from_(bucket).upload(
                path=path,
                file=file_data,
                file_options={"content-type": "application/octet-stream"}
            )
            return result
        except Exception as e:
            raise Exception(f"Failed to upload file: {str(e)}")

    async def download_file(self, bucket: str, path: str) -> bytes:
        """Download a file from Supabase Storage."""
        try:
            result = self.client.storage.from_(bucket).download(path)
            return result
        except Exception as e:
            raise Exception(f"Failed to download file: {str(e)}")

    async def list_files(self, bucket: str, path: str = "") -> List[dict]:
        """List files in a Supabase Storage bucket."""
        try:
            result = self.client.storage.from_(bucket).list(path)
            return result
        except Exception as e:
            raise Exception(f"Failed to list files: {str(e)}")

    async def delete_file(self, bucket: str, path: str) -> None:
        """Delete a file from Supabase Storage."""
        try:
            self.client.storage.from_(bucket).remove([path])
        except Exception as e:
            raise Exception(f"Failed to delete file: {str(e)}")

    async def get_public_url(self, bucket: str, path: str) -> str:
        """Get the public URL for a file."""
        try:
            result = self.client.storage.from_(bucket).get_public_url(path)
            return result
        except Exception as e:
            raise Exception(f"Failed to get public URL: {str(e)}")

# Create a singleton instance
supabase_service = SupabaseService() 