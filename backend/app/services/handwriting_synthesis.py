import os
import re
import logging
from typing import Optional, Tuple
import svgwrite
from app.core.font_config import get_font_style, get_bias_range

# Configure logging
logger = logging.getLogger(__name__)

class HandwritingSynthesisService:
    """
    Service for generating handwritten text using the otuva handwriting synthesis model.
    Includes fallback to simple SVG generation if ML model fails.
    """
    
    def __init__(self):
        self.ml_model_available = False
        self.hand_instance = None
        self._initialize_model()
    
    def _initialize_model(self):
        """
        Try to initialize the handwriting synthesis model using conda Python 3.11.
        Set ml_model_available flag based on success.
        """
        try:
            # Check if conda environment exists
            import subprocess
            conda_check = subprocess.run([
                "/home/jstnchen/miniconda/bin/conda", "info", "--envs"
            ], capture_output=True, text=True)
            
            if "py311" not in conda_check.stdout:
                raise Exception("py311 conda environment not found")
            
            # Test ML model availability using subprocess with conda
            test_result = subprocess.run([
                "/home/jstnchen/miniconda/envs/py311/bin/python", "-c",
                """
import sys
sys.path.insert(0, '/home/jstnchen/text-to-handwriting/handwriting-synthesis')
from handwriting_synthesis import Hand
hand = Hand()
print('ML_MODEL_AVAILABLE')
                """
            ], capture_output=True, text=True, cwd="/home/jstnchen/text-to-handwriting/handwriting-synthesis")
            
            if test_result.returncode == 0 and "ML_MODEL_AVAILABLE" in test_result.stdout:
                self.ml_model_available = True
                logger.info("✅ Handwriting synthesis model available with conda Python 3.11")
            else:
                raise Exception(f"ML model test failed: {test_result.stderr}")
            
        except Exception as e:
            logger.warning(f"⚠️ ML model initialization failed: {e}")
            logger.info("📝 Falling back to simple SVG generation")
            self.ml_model_available = False
    
    def validate_text(self, text: str) -> Tuple[bool, str]:
        """
        Validate input text meets requirements.
        
        Returns:
            Tuple[bool, str]: (is_valid, error_message)
        """
        if not text or not text.strip():
            return False, "Text cannot be empty"
        
        # Max 200 words
        word_count = len(text.split())
        if word_count > 200:
            return False, f"Text too long: {word_count} words (max 200)"
        
        # Character validation - allow letters, numbers, basic punctuation, spaces, newlines
        # Note: Allow most common characters for handwriting
        allowed_pattern = r'^[a-zA-Z0-9.,!?;:\-\(\)\s\n\'\"\\]+$'
        if not re.match(allowed_pattern, text):
            invalid_chars = set(text) - set(re.findall(r'[a-zA-Z0-9.,!?;:\-\(\)\s\n\'\"\\]', text))
            return False, f"Invalid characters found: {', '.join(sorted(invalid_chars))}"
        
        return True, "Valid"
    
    def _generate_with_ml_model(
        self, 
        text: str, 
        font_id: str, 
        custom_bias: Optional[float] = None,
        stroke_color: str = "#000000",
        stroke_width: float = 1.0
    ) -> str:
        """
        Generate handwriting using the ML model via conda Python 3.11 subprocess.
        
        Raises:
            Exception: If ML generation fails
        """
        if not self.ml_model_available:
            raise Exception("ML model not available")
        
        font_config = get_font_style(font_id)
        bias = custom_bias if custom_bias is not None else font_config["bias"]
        style = font_config["style"]
        
        # Create a temporary output file
        import tempfile
        import subprocess
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.svg', delete=False) as temp_file:
            temp_filename = temp_file.name
        
        try:
            # Prepare the handwriting generation script
            text_lines = repr(text.split('\n'))
            generation_script = f"""
import sys
sys.path.insert(0, '/home/jstnchen/text-to-handwriting/handwriting-synthesis')
from handwriting_synthesis import Hand

hand = Hand()
lines = {text_lines}
biases = [{bias} for _ in lines]
styles = [{style} for _ in lines]
stroke_colors = ['{stroke_color}' for _ in lines]
stroke_widths = [{stroke_width} for _ in lines]

hand.write(
    filename='{temp_filename}',
    lines=lines,
    biases=biases,
    styles=styles,
    stroke_colors=stroke_colors,
    stroke_widths=stroke_widths
)
print('SVG_GENERATION_SUCCESS')
            """
            
            # Execute with conda Python 3.11
            result = subprocess.run([
                "/home/jstnchen/miniconda/envs/py311/bin/python", "-c", generation_script
            ], capture_output=True, text=True, cwd="/home/jstnchen/text-to-handwriting/handwriting-synthesis")
            
            if result.returncode != 0 or "SVG_GENERATION_SUCCESS" not in result.stdout:
                raise Exception(f"ML generation subprocess failed: {result.stderr}")
            
            # Read the generated SVG
            with open(temp_filename, 'r') as f:
                svg_content = f.read()
            
            return svg_content
            
        finally:
            # Clean up temp file
            try:
                os.unlink(temp_filename)
            except:
                pass
    
    def _generate_fallback_svg(
        self,
        text: str,
        font_id: str,
        custom_bias: Optional[float] = None,
        stroke_color: str = "#000000", 
        stroke_width: float = 1.0
    ) -> str:
        """
        Generate simple SVG text as fallback when ML model fails.
        Creates handwriting-like appearance using SVG transforms and styling.
        """
        font_config = get_font_style(font_id)
        font_name = font_config["name"]
        
        # Create SVG document
        dwg = svgwrite.Drawing(size=('800px', '400px'))
        
        # Add a handwriting-like font styling
        font_family = "cursive, 'Comic Sans MS', 'Brush Script MT', fantasy"
        font_size = 16 + (stroke_width * 2)  # Adjust size based on stroke width
        
        # Split text into lines
        lines = text.split('\n')
        line_height = font_size * 1.5
        
        # Add title as SVG comment (skip if not supported)
        try:
            dwg.add(dwg.comment(f'Generated with {font_name} (Fallback Mode)'))
        except AttributeError:
            pass  # Some svgwrite versions don't support comments
        
        y_position = 30
        for line_idx, line in enumerate(lines):
            if not line.strip():
                y_position += line_height * 0.5  # Smaller gap for empty lines
                continue
                
            # Add slight randomness to simulate handwriting variation
            x_offset = 20 + (line_idx % 3) * 2  # Slight horizontal variation
            y_offset = y_position + (line_idx % 2) * 1  # Slight vertical variation
            
            # Create text element with handwriting-like styling
            text_element = dwg.text(
                line,
                x=[x_offset],
                y=[y_offset],
                font_family=font_family,
                font_size=f'{font_size}px',
                fill=stroke_color,
                stroke=stroke_color,
                stroke_width=f'{stroke_width * 0.5}px',
                transform=f'rotate({-0.5 + (line_idx % 4) * 0.3} {x_offset} {y_offset})'  # Slight rotation
            )
            
            dwg.add(text_element)
            y_position += line_height
        
        # Set proper viewBox based on content
        content_height = max(y_position + 20, 100)
        dwg.attribs['viewBox'] = f'0 0 800 {content_height}'
        dwg.attribs['height'] = f'{content_height}px'
        
        return dwg.tostring()
    
    def generate_handwriting_svg(
        self,
        text: str,
        font_id: str = "casual-script",
        custom_bias: Optional[float] = None,
        stroke_color: str = "#000000",
        stroke_width: float = 1.0
    ) -> str:
        """
        Generate handwritten text as SVG.
        
        Args:
            text: The text to convert to handwriting
            font_id: Font style identifier from font_config
            custom_bias: Optional custom bias (0.2-1.0), overrides font default
            stroke_color: Hex color for the handwriting strokes
            stroke_width: Width of the handwriting strokes (0.5-3.0)
            
        Returns:
            str: SVG content as string
            
        Raises:
            ValueError: If text validation fails
        """
        # Validate input text
        is_valid, error_message = self.validate_text(text)
        if not is_valid:
            raise ValueError(error_message)
        
        # Validate bias if provided
        if custom_bias is not None:
            bias_range = get_bias_range()
            if not (bias_range["min"] <= custom_bias <= bias_range["max"]):
                raise ValueError(f"Bias must be between {bias_range['min']} and {bias_range['max']}")
        
        # Try ML model first, fall back to simple SVG if it fails
        try:
            if self.ml_model_available:
                logger.info(f"🤖 Generating handwriting with ML model (font: {font_id})")
                return self._generate_with_ml_model(text, font_id, custom_bias, stroke_color, stroke_width)
        except Exception as e:
            logger.warning(f"⚠️ ML generation failed: {e}")
        
        # Fallback to simple SVG
        logger.info(f"📝 Using fallback SVG generation (font: {font_id})")
        return self._generate_fallback_svg(text, font_id, custom_bias, stroke_color, stroke_width)
    
    def get_model_status(self) -> dict:
        """
        Get the current status of the handwriting synthesis model.
        
        Returns:
            dict: Status information including availability and model type
        """
        return {
            "ml_model_available": self.ml_model_available,
            "mode": "ML Model" if self.ml_model_available else "Fallback SVG",
            "version": "otuva-handwriting-synthesis" if self.ml_model_available else "simple-svg-fallback"
        }