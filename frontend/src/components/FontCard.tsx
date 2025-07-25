import React from "react";
import { FontOption } from "../types/font";

interface FontCardProps {
  font: FontOption;
  isSelected: boolean;
  onClick: (fontId: string) => void;
}

export const FontCard: React.FC<FontCardProps> = ({ font, isSelected, onClick }) => {
  return (
    <div
      className={`
        flex-shrink-0 w-64 h-24 cursor-pointer transition-all duration-200
        border-2 rounded-lg overflow-hidden
        ${isSelected 
          ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-200' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}
      onClick={() => onClick(font.id)}
    >
      <div className="relative w-full h-full">
        {/* Preview Image */}
        <img
          src={font.previewImage}
          alt={`${font.displayName} handwriting preview`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgMjU2IDk2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEyOCIgeT0iNTIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZCNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJldmlldyBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+';
          }}
        />
        
        {/* Font Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
          <p className="text-white text-sm font-medium truncate">
            {font.displayName}
          </p>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};