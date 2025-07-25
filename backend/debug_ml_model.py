#!/usr/bin/env python3

import sys
import os

# Add paths
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def debug_ml_model():
    print("🔍 Debugging ML Model Access...")
    
    # Check if handwriting_synthesis directory exists
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    synthesis_path = os.path.join(backend_dir, 'handwriting_synthesis')
    
    print(f"📁 Backend directory: {backend_dir}")
    print(f"📁 Synthesis path: {synthesis_path}")
    print(f"📁 Synthesis exists: {os.path.exists(synthesis_path)}")
    
    if os.path.exists(synthesis_path):
        print(f"📄 Contents: {os.listdir(synthesis_path)}")
    
    # Check model files
    model_path = os.path.join(backend_dir, 'model')
    print(f"📁 Model path: {model_path}")
    print(f"📁 Model exists: {os.path.exists(model_path)}")
    
    if os.path.exists(model_path):
        print(f"📄 Model contents: {os.listdir(model_path)}")
        
        # Check style files
        style_path = os.path.join(model_path, 'style')
        if os.path.exists(style_path):
            style_files = [f for f in os.listdir(style_path) if f.endswith('.npy')]
            print(f"🎨 Style files: {len(style_files)} found")
            print(f"🎨 Styles: {sorted(style_files)[:5]}...")  # Show first 5
    
    # Test TensorFlow compatibility modes
    print("\n🤖 Testing TensorFlow compatibility...")
    
    try:
        import tensorflow as tf
        print(f"✅ TensorFlow version: {tf.__version__}")
        
        # Try tf.compat.v1
        import tensorflow.compat.v1 as tf_v1
        print("✅ TensorFlow v1 compat available")
        
        # Try disabling v2 behavior
        tf_v1.disable_v2_behavior()
        print("✅ V2 behavior disabled")
        
    except Exception as e:
        print(f"❌ TensorFlow error: {e}")
    
    # Test Keras versions
    print("\n🧠 Testing Keras compatibility...")
    
    try:
        import keras
        print(f"✅ Keras version: {keras.__version__}")
    except Exception as e:
        print(f"❌ Keras import error: {e}")
    
    try:
        import tf_keras
        print(f"✅ TF-Keras version: {tf_keras.__version__}")
    except Exception as e:
        print(f"❌ TF-Keras import error: {e}")
    
    # Try direct import of handwriting_synthesis
    print("\n📝 Testing handwriting_synthesis import...")
    
    try:
        from handwriting_synthesis import Hand
        print("✅ handwriting_synthesis.Hand imported successfully")
        
        # Try creating instance
        hand = Hand()
        print("✅ Hand instance created successfully")
        
        # Try a simple generation
        print("🎨 Testing simple generation...")
        hand.write(
            filename='debug_test.svg',
            lines=['Test'],
            biases=[0.7],
            styles=[1],
            stroke_colors=['black'],
            stroke_widths=[1]
        )
        print("✅ Simple generation successful!")
        
        # Check if file was created
        if os.path.exists('debug_test.svg'):
            with open('debug_test.svg', 'r') as f:
                content = f.read()
            print(f"📄 Generated SVG: {len(content)} characters")
            print(f"🔍 Preview: {content[:100]}...")
        
    except Exception as e:
        print(f"❌ handwriting_synthesis error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_ml_model()