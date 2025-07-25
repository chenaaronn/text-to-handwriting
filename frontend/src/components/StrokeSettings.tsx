import React, { useState, useRef, useEffect } from "react";
import { ColorSwatch } from "./ColorSwatch";
import { CustomColorPicker } from "./CustomColorPicker";
import { PlusColorButton } from "./PlusColorButton";
import { useTextInputStore } from "../store/textInput";

interface StrokeSettingsProps {
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  strokeColor: string;
  strokeColorName: string;
  onStrokeColorChange: (color: string, name: string) => void;
}

const POPULAR_COLORS = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'blue', name: 'Blue', hex: '#1E40AF' },
  { id: 'red', name: 'Red', hex: '#DC2626' },
  { id: 'purple', name: 'Purple', hex: '#7C3AED' },
  { id: 'green', name: 'Green', hex: '#059669' },
  { id: 'orange', name: 'Orange', hex: '#EA580C' }
];

export const StrokeSettings: React.FC<StrokeSettingsProps> = ({
  strokeWidth,
  onStrokeWidthChange,
  strokeColor,
  strokeColorName,
  onStrokeColorChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { customStrokeColors } = useTextInputStore();

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-medium text-gray-900 mb-4">Stroke Settings</h5>
      
      {/* Two-column grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel - Width */}
        <div className="space-y-3">
          <h6 className="text-sm font-medium text-gray-700">Width</h6>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Size:</span>
              <span className="text-sm font-medium text-gray-900">{strokeWidth}px</span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.25"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            {/* Visual preview of stroke width */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Preview:</span>
              <div 
                className="bg-gray-800 rounded-full"
                style={{ 
                  width: `${Math.max(strokeWidth * 12, 6)}px`, 
                  height: `${Math.max(strokeWidth * 2, 2)}px` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Color */}
        <div className="space-y-3">
          <h6 className="text-sm font-medium text-gray-700">Color</h6>
          <div className="relative space-y-2" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2 w-full p-2 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: strokeColor }}
              />
              <span className="text-sm font-medium text-gray-900 flex-1 text-left">
                {strokeColorName}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Color Picker Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 dropdown-animate">
                {/* All Colors Section */}
                <div className="p-3">
                  <h6 className="text-xs font-medium text-gray-500 mb-2">Colors</h6>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Popular Colors */}
                    {POPULAR_COLORS.map((color) => (
                      <ColorSwatch
                        key={color.id}
                        id={color.id}
                        name={color.name}
                        hex={color.hex}
                        isSelected={strokeColor === color.hex}
                        onClick={(hex, name) => {
                          onStrokeColorChange(hex, name);
                          setIsDropdownOpen(false);
                        }}
                      />
                    ))}
                    
                    {/* Custom Colors */}
                    {customStrokeColors.map((color) => (
                      <ColorSwatch
                        key={color.id}
                        id={color.id}
                        name={color.name}
                        hex={color.hex}
                        isSelected={strokeColor === color.hex}
                        onClick={(hex, name) => {
                          onStrokeColorChange(hex, name);
                          setIsDropdownOpen(false);
                        }}
                      />
                    ))}
                    
                    {/* Plus Button */}
                    <PlusColorButton
                      onClick={() => {
                        setShowCustomPicker(true);
                        setIsDropdownOpen(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Color Picker Modal */}
      {showCustomPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 modal-animate">
            <CustomColorPicker
              currentColor={strokeColor}
              onColorChange={onStrokeColorChange}
              onClose={() => setShowCustomPicker(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};