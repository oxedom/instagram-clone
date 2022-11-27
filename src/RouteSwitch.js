import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";
import Protected from "./components/Protected/Protected";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import PostPage from "./components/PostPage/PostPage";
import Addpost from "./components/Addpost/Addpost";
import Settings from "./components/Settings/Settings";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="sign-in" element={<Signin></Signin>} />
        <Route path="sign-up" element={<Signup></Signup>} />

        <Route
          path="feed"
          element={
            <Protected>
              <Navbar>
              <Feed></Feed>
                 </Navbar>
     
            </Protected>
          }
        >
          {" "}
        </Route>

        <Route
          path="profile/:username"
          element={
            <Protected>
              <Navbar>
              <Profile></Profile>
                 </Navbar>
 
            </Protected>
          }
        >
          {" "}
        </Route>

        <Route
          path="post/:post_id"
          element={
            <Protected>
              <Navbar>
              <PostPage></PostPage>
                 </Navbar>
      
  
            </Protected>
          }
        >
          {" "}
        </Route>

        <Route
        path="upload"
        element={<Protected>
          <Navbar>
          <Addpost></Addpost>
          </Navbar>

        </Protected>}
        ></Route>


<Route
        path="settings"
        element={<Protected>
          <Navbar></Navbar>
          <Settings></Settings>
        </Protected>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
