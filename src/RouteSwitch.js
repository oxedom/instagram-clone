import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
const RouteSwitch = (props) => {


  return (
    <BrowserRouter basename="/" >
      {/* <Navbar></Navbar> */}
      <Routes>
      <Route path="sign-up" element={<Signup/>} /> 
      <Route path="sign-in" element={<Signin/>} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;