import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Feed from "./components/Feed/Feed";
const RouteSwitch = (props) => {


  return (
    <BrowserRouter basename="/" >
      <Navbar></Navbar>
      <Routes>
     
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;