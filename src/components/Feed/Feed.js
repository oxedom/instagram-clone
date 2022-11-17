import { useNavigate } from "react-router";
import Post from "../Post/Post";


const Feed = () => {

  const navigate = useNavigate()
  
  const posts = [
    {
      url: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg",
      uid: "21938213as",
      text: "Cool glasses man",
      likes: 20
    },
    {
      url: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg",
      uid: "21938213as",
      text: "Cool glasses man",
      likes: 20
    }



  ]
 
  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {posts.map(p => <Post props={p}> </Post>)}
    </div>
  );
};

export default Feed;
