const SquarePhoto = (props) => {

    const { imgUrl} = props

    return ( <div className="m-0.5">
        <img className="aspect-square object-cover" src={imgUrl}/>
    </div>);
}
 
export default SquarePhoto;