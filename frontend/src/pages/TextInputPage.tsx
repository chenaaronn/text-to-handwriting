import React, { useState } from "react";

const TextInputPage: React.FC = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Generate Handwriting
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Enter your text below to generate handwriting.</p>
          </div>
          <div className="mt-5">
            <textarea
              rows={4}
              name="text"
              id="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Handwriting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInputPage;
