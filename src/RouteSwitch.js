import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";

const RouteSwitch = (props) => {


  return (
    <BrowserRouter basename="/">
      <Routes>

        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Signin />} />


        <Route
          path="feed"
          element={
              <Feed />
          }
        ></Route>
          
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
