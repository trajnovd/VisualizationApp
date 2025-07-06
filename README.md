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

### Installation (Local Node.js)

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

---

## Running with Docker (No Node.js/npm Needed)

If you want to run the app in a container (no need for local Node/npm):

1. **Install Docker Desktop**

   - Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
   - Make sure Docker is running

2. **Clone the repository:**

   ```sh
   git clone https://github.com/trajnovd/VisualizationApp.git
   cd VisualizationApp
   ```

3. **Build the Docker image:**

   ```sh
   docker build -t characteristics-app .
   ```

4. **Run the Docker container:**

   ```sh
   docker run -p 4173:4173 characteristics-app
   ```

5. **Open the app in your browser:**
   - Go to [http://localhost:4173](http://localhost:4173)

**Note:** You do NOT need Node.js or npm installed if you use Docker. All dependencies are handled inside the container.

---

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
