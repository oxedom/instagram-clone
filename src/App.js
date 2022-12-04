import RouteSwitch from "./RouteSwitch";
import "./index.css";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-slate-50">
      <SkeletonTheme baseColor="313131" highlightColor="#525252">
      <RouteSwitch></RouteSwitch>
      </SkeletonTheme>

    </div>
  );
}

export default App;
