import { Link } from "react-router-dom";

const SquarePhoto = (props) => {
  const { imgUrl, postID } = props;

  //Hack for 1/1 ratio for browser that don't support aspect ratio
  const containerStyle = {
  width: "100%",
   paddingBottom: "100%",
    height: 0,
    overflow: "hidden",
  }

  //Hack for 1/1 ratio for browser that don't support aspect ratio
  const imgStyles = {
    position: "relative", 
    bottom: 0,
    left: 0,
  }
  return (
    <div>
      <div  style={containerStyle} className="">
        <Link to={`/post/${postID}`}>
          <img style={imgStyles}className="m-0.5 sm:m-0 object-cover" alt="" src={imgUrl} />
        </Link>
      </div>
    </div>
  );
};

export default SquarePhoto;
