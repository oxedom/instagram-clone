import { useNavigate } from "react-router";

const Feed = () => {

  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/home')

  }
  return (
    <div className="bg-slate-50  flex-grow flex justify-center">
      <h1 onClick={handleClick}> Hello from Feed</h1>
    </div>
  );
};

export default Feed;
