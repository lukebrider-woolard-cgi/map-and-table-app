// React
import { useState } from "react";

// Components
import CatalogTable from "./components/CatalogTable";
import HeadingBar from "./components/HeadingBar";
import MapContainer from "./components/MapContainer";

// Style
import "./App.css";

export default function App() {
  const [fileName, setFileName] = useState<string>("no file loaded");
  const [view, setView] = useState<string>("Map");

  const handleViewChange = (viewName: string) => {
    setView(viewName);
  };

  function identifyComponentDisplayMode(component: string) {
    if (view === component) {
      return "full-screen";
    } else if (view === "Split") {
      return "split-screen";
    } else {
      return "hidden";
    }
  }

  return (
    <>
      <HeadingBar fileName={fileName} passSelectedView={handleViewChange} />
      <div
        className={`
          ${identifyComponentDisplayMode("Table")} table-view container
          `}
      >
        <CatalogTable />
      </div>
      <div
        className={`
          ${identifyComponentDisplayMode("Map")} map-view container
          `}
      >
        <MapContainer />
      </div>
    </>
  );
}
