import { useNavigate } from "react-router";
import Post from "../Post/Post";


const Feed = () => {

  const navigate = useNavigate()
  
  const posts = [
    {
      url: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg",
      uid: "21938213as",
      text: "Cool glasses man"


    }



  ]
 
  return (
    <div className="bg-slate-50  flex-grow flex justify-center">
      <h1 > Hello from Feed</h1>
      {posts.map(p => <Post props={p}> </Post>)}
    </div>
  );
};

export default Feed;
