#!/usr/bin/env python3

# Simple test to verify handwriting_synthesis works
import sys
import os

# Add the current directory to Python path so we can import handwriting_synthesis
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from handwriting_synthesis import Hand
    
    print("✅ Successfully imported handwriting_synthesis.Hand")
    
    # Try to create a Hand instance
    hand = Hand()
    print("✅ Successfully created Hand instance")
    
    # Test basic functionality with a simple text
    test_lines = ["Hello World"]
    biases = [0.75]
    styles = [9]
    
    print("🔄 Testing handwriting generation...")
    
    # Generate to a test file
    hand.write(
        filename='test_output.svg',
        lines=test_lines,
        biases=biases,
        styles=styles,
        stroke_colors=['black'],
        stroke_widths=[1]
    )
    
    print("✅ Successfully generated handwriting SVG!")
    print("📁 Output saved to: test_output.svg")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error during handwriting generation: {e}")
    sys.exit(1)