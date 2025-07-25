import React from "react";

interface ModeToggleProps {
  mode: "my-handwriting" | "prebuilt-fonts";
  onModeChange: (mode: "my-handwriting" | "prebuilt-fonts") => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center justify-center space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onModeChange("my-handwriting")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            mode === "my-handwriting"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }
        `}
      >
        <span className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${
            mode === "my-handwriting" ? "bg-indigo-600" : "bg-gray-400"
          }`} />
          <span>My Handwriting</span>
        </span>
      </button>
      
      <button
        onClick={() => onModeChange("prebuilt-fonts")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            mode === "prebuilt-fonts"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }
        `}
      >
        <span className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${
            mode === "prebuilt-fonts" ? "bg-indigo-600" : "bg-gray-400"
          }`} />
          <span>Prebuilt Fonts</span>
        </span>
      </button>
    </div>
  );
};