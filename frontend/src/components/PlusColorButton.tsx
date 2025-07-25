import React, { useState } from "react";

interface PlusColorButtonProps {
  onClick: () => void;
}

export const PlusColorButton: React.FC<PlusColorButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-105"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400 bg-gray-50 flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      </button>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-20 tooltip">
          <div className="text-center">
            <div className="font-medium">Add Custom Color</div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};