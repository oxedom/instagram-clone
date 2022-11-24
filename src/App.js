import RouteSwitch from "./RouteSwitch";
import "./index.css";
import { useEffect } from "react";

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-slate-50">
      <RouteSwitch></RouteSwitch>
    </div>
  );
}

export default App;
