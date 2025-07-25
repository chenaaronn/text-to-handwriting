import React, { useState } from "react";
import { useTextInputStore } from "../store/textInput";

interface CustomColorPickerProps {
  currentColor: string;
  onColorChange: (color: string, name: string) => void;
  onClose: () => void;
}

// Comprehensive color palette for professional use
const COLOR_PALETTE = [
  // Reds
  '#FF0000', '#FF4444', '#FF6B6B', '#FF8E8E', '#FFB3B3',
  // Oranges  
  '#FF4500', '#FF6600', '#FF8800', '#FFAA00', '#FFCC00',
  // Yellows
  '#FFD700', '#FFEB3B', '#FFF59D', '#FFF9C4', '#FFFDE7',
  // Greens
  '#00FF00', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7',
  // Blues
  '#0000FF', '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9',
  // Purples
  '#8000FF', '#9C27B0', '#BA68C8', '#CE93D8', '#E1BEE7',
  // Grays
  '#000000', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD'
];

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  currentColor,
  onColorChange,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'palette' | 'hex'>('palette');
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [hexInput, setHexInput] = useState(currentColor);
  const [isValidHex, setIsValidHex] = useState(true);
  const { addCustomStrokeColor } = useTextInputStore();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setHexInput(color);
  };

  const handleHexInputChange = (value: string) => {
    setHexInput(value);
    const isValid = /^#[0-9A-F]{6}$/i.test(value);
    setIsValidHex(isValid);
    if (isValid) {
      setSelectedColor(value);
    }
  };

  const handleApply = () => {
    if (activeTab === 'hex' && !isValidHex) return;
    
    // Save custom color to dashboard
    const customColor = {
      id: `custom-${Date.now()}`,
      hex: selectedColor,
      name: `Custom ${selectedColor}`,
      createdAt: new Date(),
    };
    
    addCustomStrokeColor(customColor);
    onColorChange(selectedColor, customColor.name);
    onClose();
  };

  return (
    <div className="p-4 space-y-4">
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('palette')}
          className={`
            flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${activeTab === 'palette' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          🎨 Palette
        </button>
        <button
          onClick={() => setActiveTab('hex')}
          className={`
            flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${activeTab === 'hex' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          # Hex
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[280px]">
        {activeTab === 'palette' ? (
          <div className="space-y-4">
            <div className="text-center">
              <h6 className="text-sm font-medium text-gray-700 mb-3">Color Palette</h6>
              
              {/* Current Color Preview */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: selectedColor }}
                />
                <div className="ml-3 flex flex-col justify-center">
                  <div className="text-sm font-medium text-gray-900">{selectedColor}</div>
                  <div className="text-xs text-gray-500">Selected Color</div>
                </div>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-5 gap-3 max-w-xs mx-auto mb-4">
                {COLOR_PALETTE.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorSelect(color)}
                    className={`
                      w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg
                      ${selectedColor === color 
                        ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-lg' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Native Color Picker Input */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">System Color Picker</label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorSelect(e.target.value.toUpperCase())}
                  className="w-20 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h6 className="text-sm font-medium text-gray-700 mb-3">Custom Hex Color</h6>
              
              {/* Color Preview */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: isValidHex ? selectedColor : '#F3F4F6' }}
                />
              </div>

              {/* Hex Input */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexInputChange(e.target.value.toUpperCase())}
                  placeholder="#000000"
                  className={`
                    w-full px-3 py-2 text-center font-mono text-sm border rounded-lg
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    ${isValidHex 
                      ? 'border-gray-300' 
                      : 'border-red-300 bg-red-50'
                    }
                  `}
                />
                {!isValidHex && (
                  <p className="text-xs text-red-600">
                    Please enter a valid hex color (e.g., #FF0000)
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Enter a 6-digit hex color code
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-2 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          disabled={activeTab === 'hex' && !isValidHex}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Apply Color
        </button>
      </div>
    </div>
  );
};