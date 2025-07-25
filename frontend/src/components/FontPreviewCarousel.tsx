import React, { useRef } from "react";
import { FontCard } from "./FontCard";
import { FontOption } from "../types/font";

interface FontPreviewCarouselProps {
  fonts: FontOption[];
  selectedFontId: string;
  onFontSelect: (fontId: string) => void;
}

export const FontPreviewCarousel: React.FC<FontPreviewCarouselProps> = ({
  fonts,
  selectedFontId,
  onFontSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -280, // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 280, // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-gray-900">Choose Your Font Style</h4>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {fonts.map((font) => (
          <div key={font.id} style={{ scrollSnapAlign: 'start' }}>
            <FontCard
              font={font}
              isSelected={selectedFontId === font.id}
              onClick={onFontSelect}
            />
          </div>
        ))}
      </div>

      {/* Selected Font Indicator */}
      {selectedFontId && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">Selected: </span>
          {fonts.find(f => f.id === selectedFontId)?.displayName || 'Unknown Font'}
        </div>
      )}
    </div>
  );
};