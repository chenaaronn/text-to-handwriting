import React, { useState } from "react";
import HandwritingCanvas from "../components/HandwritingCanvas";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [background, setBackground] = useState<"blank" | "lined" | "dotted">(
    "blank"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStrokeComplete = async (points: any[]) => {
    // TODO: Implement stroke analysis and style extraction
    console.log("Stroke completed:", points);
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      // TODO: Implement handwriting generation
      console.log("Generating handwriting for:", text);
    } catch (error) {
      console.error("Error generating handwriting:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            ✍️ HandwriteAI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your text into personalized handwriting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Input and controls */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your text
              </label>
              <textarea
                id="text"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper Style
              </label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-md ${
                    background === "blank"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setBackground("blank")}
                >
                  Blank
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    background === "lined"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setBackground("lined")}
                >
                  Lined
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    background === "dotted"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setBackground("dotted")}
                >
                  Dotted
                </button>
              </div>
            </div>

            <button
              className="w-full bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
              onClick={handleGenerate}
              disabled={!text.trim() || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Handwriting"}
            </button>
          </div>

          {/* Right column: Canvas */}
          <div>
            <HandwritingCanvas
              width={600}
              height={400}
              onStrokeComplete={handleStrokeComplete}
              background={background}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
