// Utility functions for parsing CSV and XLSX files
// Uses Papaparse for CSV and SheetJS (xlsx) for XLSX

import Papa from "papaparse";
import * as XLSX from "xlsx";

/**
 * Parses a CSV file (as text) and returns an array of row objects.
 * @param {string} csvText - The CSV file contents as a string.
 * @returns {Array<Object>} Parsed rows as objects.
 */
export function parseCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  if (result.errors.length) {
    console.error("CSV Parse Errors:", result.errors);
    throw new Error("Failed to parse CSV");
  }
  return result.data;
}

/**
 * Parses an XLSX file (as ArrayBuffer) and returns an array of row objects from the first sheet.
 * @param {ArrayBuffer} xlsxBuffer - The XLSX file contents as an ArrayBuffer.
 * @returns {Array<Object>} Parsed rows as objects.
 */
export function parseXLSX(xlsxBuffer) {
  const workbook = XLSX.read(xlsxBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { defval: "" });
}

/**
 * Extracts and normalizes characteristics from Q1_0_GROUP (green), Q1_1_GROUP (yellow), Q1_2_GROUP (red) columns.
 * Returns an object: { [characteristic]: { green: n, yellow: n, red: n } }
 * @param {Array<Object>} rows - Parsed rows from CSV or XLSX
 * @returns {Object} Aggregated characteristic counts by color group
 */
export function extractAndNormalizeCharacteristics(rows) {
  const result = {};
  rows.forEach((row) => {
    // Each group column may contain a comma-separated list of characteristics
    const green = (row["Q1_0_GROUP"] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const yellow = (row["Q1_1_GROUP"] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const red = (row["Q1_2_GROUP"] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    green.forEach((char) => {
      if (!result[char]) result[char] = { green: 0, yellow: 0, red: 0 };
      result[char].green += 1;
    });
    yellow.forEach((char) => {
      if (!result[char]) result[char] = { green: 0, yellow: 0, red: 0 };
      result[char].yellow += 1;
    });
    red.forEach((char) => {
      if (!result[char]) result[char] = { green: 0, yellow: 0, red: 0 };
      result[char].red += 1;
    });
  });
  return result;
}

/**
 * Converts the normalized characteristic object into an array for display.
 * Each item: { name: string, green: number, yellow: number, red: number }
 * @param {Object} normalized - Output from extractAndNormalizeCharacteristics
 * @returns {Array<Object>} Array of characteristic objects for display
 */
export function aggregateCharacteristicCounts(normalized) {
  return Object.entries(normalized).map(([name, counts]) => ({
    name,
    green: counts.green,
    yellow: counts.yellow,
    red: counts.red,
  }));
}
