from .supabase import supabase
from typing import List, Dict, Any, Optional

# Basic CRUD Operations

def get_all_records(table: str, limit: int = 100) -> List[Dict[str, Any]]:
    """Get all records from a table with optional limit"""
    response = supabase.table(table).select("*").limit(limit).execute()
    return response.data

def get_record_by_id(table: str, id: str) -> Optional[Dict[str, Any]]:
    """Get a single record by its ID"""
    response = supabase.table(table).select("*").eq("id", id).execute()
    return response.data[0] if response.data else None

def create_record(table: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new record"""
    response = supabase.table(table).insert(data).execute()
    return response.data[0] if response.data else None

def update_record(table: str, id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Update a record by ID"""
    response = supabase.table(table).update(data).eq("id", id).execute()
    return response.data[0] if response.data else None

def delete_record(table: str, id: str) -> bool:
    """Delete a record by ID"""
    response = supabase.table(table).delete().eq("id", id).execute()
    return bool(response.data)

# Advanced Queries

def search_records(table: str, column: str, search_term: str) -> List[Dict[str, Any]]:
    """Search records using ilike (case-insensitive)"""
    response = supabase.table(table).select("*").ilike(column, f"%{search_term}%").execute()
    return response.data

def filter_records(table: str, filters: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Filter records using multiple conditions"""
    query = supabase.table(table).select("*")
    for column, value in filters.items():
        query = query.eq(column, value)
    response = query.execute()
    return response.data

def get_records_with_relations(table: str, relations: List[str]) -> List[Dict[str, Any]]:
    """Get records with related data using foreign keys"""
    response = supabase.table(table).select(f"*, {', '.join(relations)}").execute()
    return response.data

def paginate_records(table: str, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
    """Get paginated records"""
    start = (page - 1) * page_size
    end = start + page_size - 1
    
    # Get total count
    count_response = supabase.table(table).select("*", count="exact").execute()
    total_count = count_response.count
    
    # Get paginated data
    response = supabase.table(table).select("*").range(start, end).execute()
    
    return {
        "data": response.data,
        "total": total_count,
        "page": page,
        "page_size": page_size,
        "total_pages": (total_count + page_size - 1) // page_size
    }

# Example usage:
"""
# Get all users
users = get_all_records("users")

# Get a specific user
user = get_record_by_id("users", "123")

# Create a new user
new_user = create_record("users", {
    "name": "John Doe",
    "email": "john@example.com"
})

# Update a user
updated_user = update_record("users", "123", {
    "name": "John Updated"
})

# Delete a user
success = delete_record("users", "123")

# Search users by name
matching_users = search_records("users", "name", "John")

# Filter users by multiple conditions
filtered_users = filter_records("users", {
    "age": 25,
    "city": "New York"
})

# Get users with their posts
users_with_posts = get_records_with_relations("users", ["posts"])

# Get paginated users
paginated_users = paginate_records("users", page=1, page_size=10)
""" 