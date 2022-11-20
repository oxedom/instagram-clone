import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";
import Protected from "./components/Protected/Protected";
import Navbar from './components/Navbar/Navbar'


const RouteSwitch = (props) => {


  const user = JSON.parse(localStorage.getItem('userInfo'))
  console.log(user);

  return (
    <BrowserRouter basename="/">
  
      <Routes>
   
      <Route path="sign-in" element={<Signin></Signin>} />
        <Route path="sign-up" element={<Signup></Signup>} />

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
