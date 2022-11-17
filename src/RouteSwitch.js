import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";
import Protected from "./components/Protected/Protected";
import Navbar from './components/Navbar/Navbar'


const RouteSwitch = (props) => {

  const user = localStorage.getItem('userInfo')
  return (
    <BrowserRouter basename="/">
  
      <Routes>
   
      <Route path="sign-in" element={user === null ? <Signin /> : <Navigate to={'/feed'}/> } />
        <Route path="sign-up" element={user === null ? <Signup/> : <Navigate to={'/feed'}/> } />

        <Route path="feed" element={ 
          <Protected>
            <Navbar> </Navbar>
            <Feed></Feed>
          </Protected>
        }> </Route>
 
        
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
