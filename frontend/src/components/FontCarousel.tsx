import React, { useRef } from "react";
import { FontData } from "../data/fontList";

interface FontCarouselProps {
  fonts: FontData[];
  selectedFontId: string;
  onFontSelect: (fontId: string) => void;
}

export const FontCarousel: React.FC<FontCarouselProps> = ({
  fonts,
  selectedFontId,
  onFontSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -260,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 260,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with scroll buttons */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">Choose Your Font Style</h4>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4"
      >
        {fonts.map((font) => (
          <button
            key={font.id}
            onClick={() => onFontSelect(font.id)}
            className={`
              flex-shrink-0 w-60 h-20 border-2 rounded-lg p-4
              transition-all duration-200 cursor-pointer
              ${selectedFontId === font.id 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="text-center">
              <div className="font-medium">{font.displayName}</div>
              <div className="text-sm text-gray-500">Preview coming soon</div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected font indicator */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">Selected: </span>
        {fonts.find(f => f.id === selectedFontId)?.displayName || selectedFontId}
      </div>
    </div>
  );
};