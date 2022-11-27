import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Comment = (props) => {

    const {text, username, date} = props.props

    const [overFlow, setOverflow] = useState('ml-2 gap-1')
    useEffect(() => {
    if(text.length > 40 ) { setOverflow('ml-2   flex-col')}
}      , [])

    

    return ( <div className={`ml-2 flex ${overFlow}`}>
        <Link to={`/profile/${username}`}>
        <span className="font-semibold"> {username} </span>

        </Link>

        <div className="flex-grow-1 flex break-all">
            <p> {text} </p>
        </div>
    </div> );
}
 
export default Comment;