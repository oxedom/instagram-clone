import { Link } from "react-router-dom";

const SquarePhoto = (props) => {
  const { imgUrl, postID } = props;

  const containerStyle = {
  width: "100%",
   paddingBottom: "100%",
    height: 0,
    overflow: "hidden",
  }

  const imgStyles = {
    position: "relative", 
    bottom: 0,
    left: 0,
  }
  return (
    <div>
      <div  style={containerStyle} className="m-0.5">
        <Link to={`/post/${postID}`}>
          <img style={imgStyles}className=" object-cover" alt="" src={imgUrl} />
        </Link>
      </div>
    </div>
  );
};

export default SquarePhoto;
