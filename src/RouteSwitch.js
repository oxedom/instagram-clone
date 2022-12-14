import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Feed from "./components/Feed/Feed";
import Protected from "./components/Protected/Protected";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import PostPage from "./components/PostPage/PostPage";
import Addpost from "./components/Addpost/Addpost";
import NotFound from "./components/NotFound/NotFound";
import Settings from "./components/Settings/Settings";
import Likes from "./components/Likes/Likes";
import Following from "./components/Following/Following";

import Followers from "./components/Followers/Followers";

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
          element={
            <Protected>
              <Navbar>
                <Addpost></Addpost>
              </Navbar>
            </Protected>
          }
        ></Route>

          <Route
          path="/profile/settings"
          element={
            <Protected>
              <Navbar>
              <Settings></Settings>
              </Navbar>
            </Protected>
          }
        ></Route>

<Route
          path="/profile/following/:username"
          element={
            <Protected>
              <Navbar>
              <Following></Following>
              </Navbar>
            </Protected>
          }
        ></Route>


          <Route
          path="/profile/followers/:username"
          element={
            <Protected>
              <Navbar>
              <Followers></Followers>
              </Navbar>
            </Protected>
          }
        ></Route>



<Route
          path="likes"
          element={
            <Protected>
              <Navbar>
              <Likes></Likes>
              </Navbar>
            </Protected>
          }
        ></Route>

        <Route path="*" element={<NotFound> </NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
