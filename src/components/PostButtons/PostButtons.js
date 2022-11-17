const PostButtons = (props) => {
    const {url, text, uid, likes} = props.props


    return (         <div>
        <ul className="flex gap-2">
            <li>Heart</li>
            <li>Comments</li>
        </ul>
        <p> {likes} likes </p>
    </div> );
}
 
export default PostButtons;