# Characteristics Ranking Visualization App

A digital React app for visualizing group rankings of characteristics, inspired by workshop exercises.

## Features

- Displays characteristics in three columns, each with colored circles for green/yellow/red votes.
- Data loaded from local CSV/XLSX files.
- Responsive, accessible, and visually clear.
- Sort/filter by most greens, most points, or alphabetically.
- Expandable rows for characteristics with many votes.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/trajnovd/VisualizationApp.git
   cd VisualizationApp
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and go to [http://localhost:5173](http://localhost:5173)

### Running with Docker

If you want to run the app in a container (no need for local Node/npm):

1. Build the Docker image:

   ```sh
   docker build -t characteristics-app .
   ```

2. Run the container:

   ```sh
   docker run -p 4173:4173 characteristics-app
   ```

3. Open your browser and go to [http://localhost:4173](http://localhost:4173)

### Project Structure

- `src/assets/Data.csv` — User ranking data (CSV)
- `src/assets/Values.xlsx` — List of all possible characteristics (XLSX)
- `src/components/` — React components
- `src/utils/` — Data parsing utilities

### Customization

- To update the list of characteristics or votes, replace the files in `src/assets/`.
- For future API integration, see the code comments in `src/App.jsx`.

---

## License

MIT

---

## Author

[trajnovd](https://github.com/trajnovd)
