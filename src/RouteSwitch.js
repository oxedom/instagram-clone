import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";
import RequireAuth from './components/ProtectedRoute/RequireAuth'
//Check AUTH is middleware to check if user is logged in or not, if logged will redriect to feed, else to sign in


const RouteSwitch = (props) => {




  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Signin />} />

        <Route
          path="feed"
          element={
            <RequireAuth>
              <Feed />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
