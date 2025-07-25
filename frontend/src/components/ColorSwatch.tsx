import React, { useState } from "react";

interface ColorSwatchProps {
  id: string;
  name: string;
  hex: string;
  isSelected: boolean;
  onClick: (color: string, name: string) => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  id,
  name,
  hex,
  isSelected,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => onClick(hex, name)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex items-center justify-center p-3 rounded-lg transition-all duration-200
          hover:bg-gray-50 hover:scale-105
          ${isSelected ? 'bg-indigo-50 ring-2 ring-indigo-200' : ''}
        `}
      >
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
            style={{ backgroundColor: hex }}
          />
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-4 h-4 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </button>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-20 tooltip">
          <div className="text-center">
            <div className="font-medium">{name}</div>
            <div className="text-gray-300">{hex}</div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};