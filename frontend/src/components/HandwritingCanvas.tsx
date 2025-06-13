import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

interface Point {
  x: number;
  y: number;
  pressure: number;
}

interface HandwritingCanvasProps {
  width: number;
  height: number;
  onStrokeComplete?: (points: Point[]) => void;
  background?: "blank" | "lined" | "dotted";
}

const HandwritingCanvas: React.FC<HandwritingCanvasProps> = ({
  width,
  height,
  onStrokeComplete,
  background = "blank",
}) => {
  const [lines, setLines] = useState<Point[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, [{ x: pos.x, y: pos.y, pressure: 1 }]]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];

    // Add new point to the last line
    lastLine.push({ x: point.x, y: point.y, pressure: 1 });

    // Replace the last line
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (onStrokeComplete && lines.length > 0) {
      onStrokeComplete(lines[lines.length - 1]);
    }
  };

  const renderBackground = () => {
    switch (background) {
      case "lined":
        return (
          <>
            {Array.from({ length: Math.floor(height / 30) }).map((_, i) => (
              <Line
                key={`line-${i}`}
                points={[0, i * 30, width, i * 30]}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))}
          </>
        );
      case "dotted":
        return (
          <>
            {Array.from({ length: Math.floor(width / 20) }).map((_, i) =>
              Array.from({ length: Math.floor(height / 20) }).map((_, j) => (
                <Line
                  key={`dot-${i}-${j}`}
                  points={[i * 20, j * 20, i * 20 + 1, j * 20]}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
              ))
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm">
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseleave={handleMouseUp}
        ref={stageRef}
        className="bg-white"
      >
        <Layer>
          {renderBackground()}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.flatMap((p) => [p.x, p.y])}
              stroke="#000000"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default HandwritingCanvas;
