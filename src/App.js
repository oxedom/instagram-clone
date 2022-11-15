import RouteSwitch from "./RouteSwitch";
import "./index.css";
import { useState } from "react";

function App() {

  localStorage.setItem("auth", 'false')

  const isLoggedIn = () => {
    return localStorage.getItem('auth')
  }
  const logIn = () =>  localStorage.setItem("auth", 'true')
  const logOut = () =>  localStorage.setItem("auth", 'false');


  return (
    <div className="App flex flex-col min-h-screen">
      
      <RouteSwitch props={{logIn,logOut, isLoggedIn}}></RouteSwitch>
   
    </div>
  );
}

export default App;
