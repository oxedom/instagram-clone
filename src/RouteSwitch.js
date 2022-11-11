import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'

const RouteSwitch = (props) => {


  return (
    <BrowserRouter basename="/" >
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={Navbar}/>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;