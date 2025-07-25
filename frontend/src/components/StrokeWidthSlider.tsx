import React from "react";

interface StrokeWidthSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const StrokeWidthSlider: React.FC<StrokeWidthSliderProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-medium text-gray-900 mb-3">Stroke Settings</h5>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Width:</label>
          <span className="text-sm font-medium text-gray-900">{value}px</span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={value}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        {/* Visual preview of stroke width */}
        <div className="flex items-center space-x-2 mt-3">
          <span className="text-xs text-gray-500">Preview:</span>
          <div 
            className="bg-gray-800 rounded-full"
            style={{ 
              width: `${Math.max(value * 8, 4)}px`, 
              height: `${Math.max(value * 2, 2)}px` 
            }}
          />
        </div>
      </div>
    </div>
  );
};