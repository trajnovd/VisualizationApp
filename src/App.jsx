import React, { useEffect, useState } from "react";
import CharacteristicsGrid from "./components/CharacteristicsGrid";
import {
  parseCSV,
  parseXLSX,
  extractAndNormalizeCharacteristics,
  aggregateCharacteristicCounts,
} from "./utils/dataParser";
import "./App.css";

const SORT_OPTIONS = [
  { value: "greens", label: "Most Greens" },
  { value: "points", label: "Most Points" },
  { value: "alpha", label: "Alphabetically" },
];

function sortCharacteristics(data, mode) {
  if (mode === "greens") {
    return [...data].sort(
      (a, b) => b.green - a.green || b.yellow - a.yellow || b.red - a.red
    );
  } else if (mode === "points") {
    return [...data].sort((a, b) => {
      const pointsA = a.green * 3 + a.yellow * 2 + a.red;
      const pointsB = b.green * 3 + b.yellow * 2 + b.red;
      return (
        pointsB - pointsA ||
        b.green - a.green ||
        b.yellow - a.yellow ||
        b.red - a.red
      );
    });
  } else if (mode === "alpha") {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }
  return data;
}

function App() {
  const [characteristics, setCharacteristics] = useState([]);
  const [sortedCharacteristics, setSortedCharacteristics] = useState([]);
  const [sortMode, setSortMode] = useState("greens");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Load all possible values from Values.xlsx
        const valuesRes = await fetch("/src/assets/Values.xlsx");
        const valuesBuffer = await valuesRes.arrayBuffer();
        const valuesRows = parseXLSX(valuesBuffer);
        // Assume the characteristic name is in the first column of each row, and deduplicate
        const allValues = Array.from(
          new Set(
            valuesRows.map((row) => Object.values(row)[0]).filter(Boolean)
          )
        );

        // Load user data from Data.csv
        const dataRes = await fetch("/src/assets/Data.csv");
        const dataText = await dataRes.text();
        const dataRows = parseCSV(dataText);

        // Aggregate user rankings
        const normalized = extractAndNormalizeCharacteristics(dataRows);
        const aggregated = aggregateCharacteristicCounts(normalized);
        // Map all possible values, filling in zeros for missing ones
        let displayData = allValues.map((name) => {
          const found = aggregated.find((c) => c.name === name);
          return found || { name, green: 0, yellow: 0, red: 0 };
        });
        setCharacteristics(displayData);
      } catch (err) {
        setError("Failed to load or parse data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    setSortedCharacteristics(sortCharacteristics(characteristics, sortMode));
  }, [characteristics, sortMode]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Characteristics Ranking Visualization
      </h1>
      <div className="mb-4 flex items-center gap-2">
        <label
          htmlFor="sort-mode"
          className="font-medium text-gray-700 text-sm"
        >
          Sort by:
        </label>
        <select
          id="sort-mode"
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <CharacteristicsGrid characteristics={sortedCharacteristics} />
    </div>
  );
}

export default App;
