#!/usr/bin/env python3

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.services.handwriting_synthesis import HandwritingSynthesisService

def test_handwriting_service():
    """Test the HandwritingSynthesisService"""
    
    print("🧪 Testing HandwritingSynthesisService...")
    
    # Initialize service
    service = HandwritingSynthesisService()
    
    # Check model status
    status = service.get_model_status()
    print(f"📊 Model Status: {status}")
    
    # Test text validation
    print("\n🔍 Testing text validation...")
    
    # Valid text
    is_valid, msg = service.validate_text("Hello World!")
    print(f"✅ Valid text: {is_valid} - {msg}")
    
    # Invalid characters
    is_valid, msg = service.validate_text("Hello 世界!")  # Contains Chinese characters
    print(f"❌ Invalid chars: {is_valid} - {msg}")
    
    # Too long text
    long_text = " ".join(["word"] * 201)  # 201 words
    is_valid, msg = service.validate_text(long_text)
    print(f"❌ Too long: {is_valid} - {msg}")
    
    # Test SVG generation
    print("\n🎨 Testing SVG generation...")
    
    try:
        test_text = "Hello World!\nThis is a test of handwriting synthesis."
        svg_content = service.generate_handwriting_svg(
            text=test_text,
            font_id="casual-script",
            custom_bias=0.8,
            stroke_color="#0066cc",
            stroke_width=1.5
        )
        
        print(f"✅ SVG generated successfully!")
        print(f"📝 SVG length: {len(svg_content)} characters")
        print(f"🔍 SVG preview (first 200 chars):")
        print(svg_content[:200] + "..." if len(svg_content) > 200 else svg_content)
        
        # Save to file for inspection
        with open('test_output.svg', 'w') as f:
            f.write(svg_content)
        print(f"💾 SVG saved to: test_output.svg")
        
    except Exception as e:
        print(f"❌ SVG generation failed: {e}")
    
    # Test different fonts
    print("\n🎭 Testing different font styles...")
    
    font_styles = ["casual-script", "elegant-formal", "creative-flow"]
    for font_id in font_styles:
        try:
            svg = service.generate_handwriting_svg(
                text="Sample text",
                font_id=font_id,
                stroke_color="#333333"
            )
            print(f"✅ {font_id}: Generated {len(svg)} chars")
        except Exception as e:
            print(f"❌ {font_id}: Failed - {e}")

if __name__ == "__main__":
    test_handwriting_service()