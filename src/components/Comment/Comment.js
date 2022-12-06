import ShowMoreText from "react-show-more-text";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Comment = (props) => {
  const { text, username } = props.commentData;

  const [displayText, setDisplayText] = useState(text)
  const [render, setRender] = useState(null)

  
  useEffect(() => {

   
    const checkIfTooLong = (para) => {
      let wordArray = para.split(' ')
    

    wordArray.forEach(word => 
      {
        if(word.length > 20) 
        {
          let index = wordArray.findIndex((e) => e == word)
          wordArray.splice(index,1)
   
        }
      })
      if(wordArray.length === 0) {
        setRender('hidden')
      }
      else {
        setDisplayText(wordArray.join(' ').toString())
      }
  
    }
    if(text.length > 50) {
      checkIfTooLong(text)
    }
    
  }
  ,[])


  return (

    <div className={`flex  gap-1 ${render}`}>
      <Link to={`/profile/${username}`}>
        <span className="font-semibold"> {username} </span>
      </Link>

      <div className="">
        <ShowMoreText
          more="show more"
          less="show less"
          anchorClass="hover:underline text-gray-500 "
          width={300}
     
          lines={1}

        >
         <div className=" overflow-hidden">
          <span> {displayText} </span>
         </div>
     
        </ShowMoreText>
      
        
   
      </div>
    </div> 
  )
    
  ;
};

export default Comment;
