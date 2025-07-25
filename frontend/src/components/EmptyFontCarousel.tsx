import React, { useRef } from "react";

interface EmptyFontCarouselProps {
  selectedFontId: string;
  onFontSelect: (fontId: string) => void;
}

export const EmptyFontCarousel: React.FC<EmptyFontCarouselProps> = ({
  selectedFontId,
  onFontSelect,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const fonts = [
    { id: "casual-script", name: "Casual Script" },
    { id: "elegant-cursive", name: "Elegant Cursive" },
    { id: "neat-print", name: "Neat Print" },
    { id: "flowing-hand", name: "Flowing Hand" },
    { id: "modern-signature", name: "Modern Signature" },
    { id: "quick-notes", name: "Quick Notes" },
    { id: "romantic-script", name: "Romantic Script" },
    { id: "business-formal", name: "Business Formal" },
    { id: "student-notes", name: "Student Notes" }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">Choose Your Font Style</h4>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            →
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4"
      >
        {fonts.map((font) => (
          <button
            key={font.id}
            onClick={() => onFontSelect(font.id)}
            className={`
              flex-shrink-0 w-48 px-6 py-4 border-2 rounded-lg
              ${selectedFontId === font.id 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="text-center">
              <div className="text-sm font-medium">{font.name}</div>
              <div className="text-xs text-gray-500 mt-1">Preview coming soon</div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        <span className="font-medium">Selected: </span>
        {fonts.find(f => f.id === selectedFontId)?.name || selectedFontId}
      </div>
    </div>
  );
};