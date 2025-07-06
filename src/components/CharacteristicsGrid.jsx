import React from "react";
import CharacteristicRow from "./CharacteristicRow";

/**
 * Props:
 * - characteristics: Array<{ name: string, green: number, yellow: number, red: number }>
 */
export default function CharacteristicsGrid({ characteristics }) {
  // Divide characteristics into 3 columns as evenly as possible
  const total = characteristics.length;
  const colSize = Math.ceil(total / 3);
  const columns = [
    characteristics.slice(0, colSize),
    characteristics.slice(colSize, colSize * 2),
    characteristics.slice(colSize * 2),
  ];

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 md:gap-1">
      {columns.map((col, i) => (
        <div key={i} className="flex-1 min-w-0">
          {col.map((char) => (
            <CharacteristicRow key={char.name} {...char} />
          ))}
        </div>
      ))}
    </div>
  );
}
