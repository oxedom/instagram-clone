import { Link } from "react-router-dom";


const SquarePhoto = (props) => {
  const { imgUrl, postID } = props;

  return(
  <div>
    <div className="m-0.5">
      <Link to={`/post/${postID}`}>
        
        <img className="aspect-square object-cover" alt="" src={imgUrl} />
      </Link>
    </div>
  </div>
  );
};

export default SquarePhoto;
