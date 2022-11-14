import { useEffect, useState } from 'react';
import RouteSwitch from './RouteSwitch'
import './index.css'
import Signup from './components/Signup/Signup';

function App() {

  return (
    <div className="App flex flex-col min-h-screen" >
      <Signup></Signup>
      {/* <RouteSwitch></RouteSwitch> */}
      {/* {users.map((user,i) => <h1 className="text-3xl font-bold underline" key={user.id}> {user.username} </h1>)} */}

    </div>
  );
}

export default App;
