// import { useCallback, useEffect, useState } from "react";
// import { auth } from "../../firebase";
// import { UserService } from "../../services/UserService";
// import { onAuthStateChanged } from "firebase/auth";


// const Likes = () => {

//     const userAPI = UserService()
//     const  [likes, setLikes] = useState([])

//     const fetchData = useCallback(() => {
//         onAuthStateChanged(auth, async (user) => {
//             if(user) 
//             {
//                 const data = await userAPI.getUserLikesById(user.uid)
//                 setLikes(data)
//             }
//         })
     
//     }, [userAPI])

//     useEffect(() => {
//         fetchData()

//     }, [])
    
//     return ( <div className="flex flex-col gap-2 mt-4">
//        {likes.map(u =>
//         <div className="flex gap-2 items-center"> 
            
//             <img className='w-16 h-16 md:w-16 md:h-26  object-cover  rounded-full' src={u.photoURL}/>
//             <p> {u.username}</p>

//         </div>
        
//     )}
//     </div>  );
// }
 
// export default Likes;