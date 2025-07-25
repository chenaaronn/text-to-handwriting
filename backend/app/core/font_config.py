from typing import Dict, Any

# Font style mapping based on available otuva handwriting-synthesis styles (0-12)
# Each font has a style number, default bias (neatness), and display name
FONT_STYLES: Dict[str, Dict[str, Any]] = {
    "casual-script": {
        "style": 9, 
        "bias": 0.75, 
        "name": "Casual Script",
        "description": "Relaxed, everyday handwriting style"
    },
    "elegant-formal": {
        "style": 12, 
        "bias": 0.9, 
        "name": "Elegant Formal",
        "description": "Sophisticated and neat formal writing"
    },
    "relaxed-writing": {
        "style": 7, 
        "bias": 0.6, 
        "name": "Relaxed Writing",
        "description": "Loose, natural handwriting flow"
    },
    "neat-print": {
        "style": 5, 
        "bias": 1.0, 
        "name": "Neat Print",
        "description": "Clean, precise handwriting"
    },
    "creative-flow": {
        "style": 3, 
        "bias": 0.4, 
        "name": "Creative Flow",
        "description": "Artistic, expressive handwriting"
    },
    "standard-cursive": {
        "style": 1, 
        "bias": 0.8, 
        "name": "Standard Cursive",
        "description": "Classic cursive handwriting"
    },
    "bold-writing": {
        "style": 0, 
        "bias": 0.7, 
        "name": "Bold Writing",
        "description": "Strong, confident strokes"
    },
    "vintage-style": {
        "style": 2, 
        "bias": 0.85, 
        "name": "Vintage Style",
        "description": "Classic, old-fashioned penmanship"
    },
    "modern-minimal": {
        "style": 4, 
        "bias": 0.9, 
        "name": "Modern Minimal",
        "description": "Clean, contemporary style"
    },
    "expressive-hand": {
        "style": 6, 
        "bias": 0.5, 
        "name": "Expressive Hand",
        "description": "Dynamic, personality-rich writing"
    },
    "quick-notes": {
        "style": 8, 
        "bias": 0.65, 
        "name": "Quick Notes",
        "description": "Fast, practical note-taking style"
    },
    "calligraphy-inspired": {
        "style": 10, 
        "bias": 0.95, 
        "name": "Calligraphy Inspired",
        "description": "Beautiful, artistic penmanship"
    },
    "professional-hand": {
        "style": 11, 
        "bias": 0.88, 
        "name": "Professional Hand",
        "description": "Business-appropriate handwriting"
    }
}

def get_font_style(font_id: str) -> Dict[str, Any]:
    """
    Get font configuration by font ID.
    Returns casual-script as default if font_id not found.
    """
    return FONT_STYLES.get(font_id, FONT_STYLES["casual-script"])

def get_available_fonts() -> Dict[str, Dict[str, Any]]:
    """
    Get all available font configurations.
    """
    return FONT_STYLES

def get_font_list() -> list:
    """
    Get a list of font IDs and names for UI display.
    """
    return [
        {
            "id": font_id,
            "name": config["name"],
            "description": config["description"]
        }
        for font_id, config in FONT_STYLES.items()
    ]

def validate_font_id(font_id: str) -> bool:
    """
    Check if a font_id is valid.
    """
    return font_id in FONT_STYLES

def get_bias_range() -> Dict[str, float]:
    """
    Get the valid range for bias/neatness values.
    """
    return {
        "min": 0.2,
        "max": 1.0,
        "default": 0.75,
        "step": 0.05
    }