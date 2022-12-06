import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

const SquarePhoto = (props) => {
  const { imgUrl, postID } = props;

  //Hack for 1/1 ratio for browser that don't support aspect ratio

  let containerStyle = {
  width: "100%",
  position: 'relative',
   paddingTop: "100%",
  //  height: "100%",
    background: 'red',
    // padding: '10px',
    height: 0,
    overflow: "hidden",
  }

  //Hack for 1/1 ratio for browser that don't support aspect ratio
  let imgStyles = {
    position: "absolute", 
    width: '100%',
    height: '100%',
    // bottom: 0,
    // right: 0,
    top: 0,
    left: 0,
  }


  let aspectRatio = 'aspect-square'

  if(!isMobile) {
    containerStyle = {}
    imgStyles = {}
  }

  return (
    <div>
      <div  style={containerStyle} className="">
        <Link to={`/post/${postID}`}>
          <img style={imgStyles}className={`m-0.5 sm:m-0 object-cover ${aspectRatio}`} alt="" src={imgUrl} />
        </Link>
      </div>
    </div>
  );
};

export default SquarePhoto;
