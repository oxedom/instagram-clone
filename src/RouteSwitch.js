import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";
import Protected from "./components/Protected/Protected";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import PostPage from "./components/PostPage/PostPage";
const RouteSwitch = (props) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="sign-in" element={<Signin></Signin>} />
        <Route path="sign-up" element={<Signup></Signup>} />

        <Route
          path="feed"
          element={
            <Protected>
              <Navbar> </Navbar>
              <Feed></Feed>
            </Protected>
          }
        >
          {" "}
        </Route>

        <Route
          path="profile/:username"
          element={
            <Protected>
              <Navbar> </Navbar>
              <Profile></Profile>
            </Protected>
          }
        >
          {" "}
        </Route>

        <Route
          path="post/:post_id"
          element={
            <Protected>
              <Navbar> </Navbar>
              <PostPage></PostPage>
            </Protected>
          }
        >
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
