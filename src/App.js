import RouteSwitch from "./RouteSwitch";

import "./index.css";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      
      <RouteSwitch></RouteSwitch>
      {/* {users.map((user,i) => <h1 className="text-3xl font-bold underline" key={user.id}> {user.username} </h1>)} */}
    </div>
  );
}

export default App;
