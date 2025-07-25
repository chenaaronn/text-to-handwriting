from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.handwriting_synthesis import HandwritingSynthesisService
from app.core.font_config import get_all_font_styles, get_bias_range
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize the handwriting synthesis service
synthesis_service = HandwritingSynthesisService()

class Point(BaseModel):
    x: float
    y: float
    pressure: float

class HandwritingRequest(BaseModel):
    style_points: List[Point]
    text: str
    max_length: Optional[int] = 100

class HandwritingSVGRequest(BaseModel):
    text: str
    font_id: str = "casual-script"
    custom_bias: Optional[float] = None
    stroke_color: str = "#000000"
    stroke_width: float = 1.0

class HandwritingResponse(BaseModel):
    points: List[Point]
    success: bool
    message: str

class HandwritingSVGResponse(BaseModel):
    svg_content: str
    font_style: str
    success: bool
    message: str
    model_status: dict

@router.post("/generate-svg", response_model=HandwritingSVGResponse)
async def generate_handwriting_svg(request: HandwritingSVGRequest):
    """
    Generate handwritten text as SVG using ML model or fallback.
    """
    try:
        logger.info(f"Generating handwriting SVG for text: '{request.text[:50]}...'")
        
        # Generate SVG using the synthesis service
        svg_content = synthesis_service.generate_handwriting_svg(
            text=request.text,
            font_id=request.font_id,
            custom_bias=request.custom_bias,
            stroke_color=request.stroke_color,
            stroke_width=request.stroke_width
        )
        
        # Get font style info
        from app.core.font_config import get_font_style
        font_config = get_font_style(request.font_id)
        
        return HandwritingSVGResponse(
            svg_content=svg_content,
            font_style=font_config["name"],
            success=True,
            message="Handwriting SVG generated successfully",
            model_status=synthesis_service.get_model_status()
        )
        
    except ValueError as e:
        # Validation errors (bad input)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Other errors (server issues)
        logger.error(f"Error generating handwriting SVG: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating handwriting: {str(e)}")

@router.get("/fonts")
async def get_available_fonts():
    """
    Get list of all available font styles.
    """
    try:
        fonts = get_all_font_styles()
        bias_range = get_bias_range()
        
        return {
            "fonts": fonts,
            "bias_range": bias_range,
            "model_status": synthesis_service.get_model_status()
        }
    except Exception as e:
        logger.error(f"Error getting font list: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting fonts: {str(e)}")

@router.get("/model-status")
async def get_model_status():
    """
    Get current ML model status and availability.
    """
    return synthesis_service.get_model_status()

@router.post("/synthesize", response_model=HandwritingResponse)
async def synthesize_handwriting(request: HandwritingRequest):
    """
    Legacy endpoint for point-based handwriting synthesis.
    """
    try:
        # For now, return dummy data - this was the original behavior
        import numpy as np
        dummy_points = [
            Point(x=float(x), y=float(y), pressure=1.0)
            for x, y in zip(
                np.linspace(0, 100, request.max_length),
                np.sin(np.linspace(0, 4*np.pi, request.max_length)) * 20 + 50
            )
        ]
        
        return HandwritingResponse(
            points=dummy_points,
            success=True,
            message="Handwriting generated successfully (legacy mode)"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating handwriting: {str(e)}"
        )

@router.post("/analyze-style", response_model=HandwritingResponse)
async def analyze_handwriting_style(request: HandwritingRequest):
    try:
        # TODO: Implement style analysis
        return HandwritingResponse(
            points=request.style_points,
            success=True,
            message="Style analyzed successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing handwriting style: {str(e)}"
        ) 