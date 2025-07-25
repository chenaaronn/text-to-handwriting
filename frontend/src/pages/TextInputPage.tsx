import React, { useState, useEffect } from "react";
import { ModeToggle } from "../components/ModeToggle";
import { EmptyFontCarousel } from "../components/EmptyFontCarousel";
import { StrokeSettings } from "../components/StrokeSettings";
import { useTextInputStore } from "../store/textInput";

const TextInputPage: React.FC = () => {
  const {
    mode,
    setMode,
    inputText,
    setInputText,
    modelLoading,
    setModelLoading,
    selectedFont,
    setSelectedFont,
    fontSettings,
    setFontSettings,
  } = useTextInputStore();

  const [wordCount, setWordCount] = useState(0);
  const [textareaRows, setTextareaRows] = useState(4);

  // Calculate word count
  const calculateWordCount = (text: string): number => {
    if (!text.trim()) return 0;
    // Remove punctuation and split by whitespace
    const words = text.trim().replace(/[^\w\s]/g, '').split(/\s+/).filter(word => word.length > 0);
    return words.length;
  };

  // Calculate dynamic rows based on content and word count
  const calculateRows = (text: string, wordCount: number): number => {
    const minRows = 4;
    const maxRows = 12; // Roughly equivalent to ~200 words
    const baseRows = Math.max(minRows, Math.ceil(text.length / 80)); // ~80 chars per row
    
    // If over 200 words, limit to maxRows for scrolling
    if (wordCount > 200) {
      return maxRows;
    }
    
    return Math.min(baseRows, maxRows);
  };

  useEffect(() => {
    const count = calculateWordCount(inputText);
    setWordCount(count);
    setTextareaRows(calculateRows(inputText, count));
  }, [inputText]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setModelLoading(true);
    try {
      if (mode === "my-handwriting") {
        console.log("Generating handwriting for:", inputText);
      } else {
        console.log("Rendering prebuilt font for:", inputText);
      }
    } catch (error) {
      console.error("Error generating:", error);
    } finally {
      setModelLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mode Toggle */}
      <div className="mb-8 flex justify-center">
        <ModeToggle mode={mode} onModeChange={setMode} />
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {mode === "my-handwriting" ? "Generate Your Handwriting" : "Render with Prebuilt Fonts"}
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              {mode === "my-handwriting"
                ? "Enter your text to generate handwriting in your personal style."
                : "Enter your text to render with beautiful prebuilt handwriting fonts."
              }
            </p>
          </div>

          {/* Text Input */}
          <div className="mt-5">
            <div className="relative">
              <textarea
                rows={textareaRows}
                name="text"
                id="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none"
                placeholder="Type your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ 
                  minHeight: '100px',
                  maxHeight: wordCount > 200 ? '300px' : 'none',
                  overflowY: wordCount > 200 ? 'auto' : 'hidden'
                }}
              />
              {/* Word Count Display */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
                {wordCount > 200 && (
                  <span className="text-yellow-600 ml-1">• Scrolling</span>
                )}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              onClick={handleGenerate}
              disabled={modelLoading || !inputText.trim()}
            >
              {modelLoading 
                ? "Processing..." 
                : mode === "my-handwriting" 
                  ? "Generate Handwriting" 
                  : "Render Text"
              }
            </button>
          </div>

          {/* Mode-specific content */}
          <div className="mt-8">
            {mode === "my-handwriting" ? (
              <div className="text-sm text-gray-500">
                <p>🚧 My Handwriting mode - Coming soon!</p>
              </div>
            ) : (
              <div className="space-y-6">
                <EmptyFontCarousel
                  selectedFontId={selectedFont}
                  onFontSelect={setSelectedFont}
                />
                <StrokeSettings
                  strokeWidth={fontSettings.strokeWidth}
                  onStrokeWidthChange={(strokeWidth) => setFontSettings({ strokeWidth })}
                  strokeColor={fontSettings.strokeColor}
                  strokeColorName={fontSettings.strokeColorName}
                  onStrokeColorChange={(strokeColor, strokeColorName) => 
                    setFontSettings({ strokeColor, strokeColorName })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInputPage;
