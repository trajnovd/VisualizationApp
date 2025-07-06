import React from "react";

/**
 * Props:
 * - name: string (characteristic name)
 * - green: number (count for green)
 * - yellow: number (count for yellow)
 * - red: number (count for red)
 */
export default function CharacteristicRow({ name, green, yellow, red }) {
  // Build the array of colored circles (no empty yet)
  const coloredCircles = [];
  for (let i = 0; i < green; i++) coloredCircles.push("green");
  for (let i = 0; i < yellow; i++) coloredCircles.push("yellow");
  for (let i = 0; i < red; i++) coloredCircles.push("red");

  // Accessible color palette
  const colorMap = {
    green: "bg-green-400",
    yellow: "bg-yellow-300",
    red: "bg-red-400",
    empty: "bg-white",
  };

  const colorLabel = {
    green: "Top 1–5 (green)",
    yellow: "Rank 6–10 (yellow)",
    red: "Rank 11–15 (red)",
    empty: "No vote",
  };

  // Add empty circle at the end
  const allCircles = [...coloredCircles, "empty"];

  return (
    <div className="flex flex-col border-b border-gray-200 last:border-b-0 px-0 md:px-2 py-1">
      <div className="flex items-center justify-between gap-2 w-full">
        <span className="font-medium text-gray-900 text-sm md:text-base whitespace-normal break-words text-left flex-1">
          {name}
        </span>
        <div
          className="flex gap-1 md:gap-1.5 flex-wrap"
          aria-label="Ranking circles"
          role="group"
        >
          {allCircles.map((color, idx) => (
            <span
              key={idx}
              className={`inline-block w-3 h-3 md:w-4 md:h-4 rounded-full ${colorMap[color]} border border-gray-300`}
              aria-label={colorLabel[color]}
              role="img"
              title={colorLabel[color]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
