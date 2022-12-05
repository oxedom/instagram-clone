import RouteSwitch from "./RouteSwitch";
import "./index.css";


function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-slate-50">

      <RouteSwitch></RouteSwitch>

      <div className="mt-20 sm:mt-10 "></div>
    </div>
  );
}

export default App;
