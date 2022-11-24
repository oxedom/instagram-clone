

import { Link } from 'react-router-dom'
import threeDots from '../../assests/dots.png'

import { useUser } from '../../services/useUser'

const ProfileInfo = (props) => {
    const { posts } = props
    const { photoURL, username, bio, following, followers, uid} = props.props
    const userAPI = useUser()



    const handleFollow = async () => {

        //Sending the current UID of the users profile
        userAPI.toogleFollow(uid)
    }


    return ( <div className="bg-slate-100 flex flex-col">

        
        <div className="m-4 flex justify-around ">
        
        {/* profile Pictutre */}
        <img className="rounded-full object-cover aspect-ratio: auto; w-20 h-20" src={photoURL} alt="profile"/>


        {/* Username and follow button */}
        <div className="flex gap-2 flex-col justify-self-center">

        <div className="flex gap-5">
        <h1 className="font-meduim text-4xl"> {username} </h1>

        <div className="flex items-center" >
        <Link to='/settings'>
        <img className=" text-white  text-center hover:cursor-pointer" src={threeDots} alt='settings' />
        </Link>
      
        </div>

   
   
        </div>
  

        <div className="button border flex justify-center p-0.5 text-white bg-blue-500  text-center hover:cursor-pointer"> 
        <span onClick={handleFollow}className="font-medium">  Follow </span>
        
        </div>
        </div>


        </div>

  
        <p className="m-4 font-semibold" alt="bio"> {bio} </p>
        <hr></hr>

        <div className="grid grid-cols-3 mt-3 mb-3">

        <div className="flex flex-col justify-center items-center" >
        <span className="text-sm font-semibold"> {posts.length} </span>
        <span className="text-sm"> posts </span>
        </div>

        <div className="flex flex-col justify-center items-center" >
        <span className="text-sm font-semibold"> {followers.length} </span>
        <span className="text-sm"> followers </span>
        </div>

        <div className="flex flex-col justify-center items-center" >
        <span className="text-sm font-semibold"> {following.length} </span>
        <span className="text-sm"> following </span>
        </div>

        


        </div>

    </div>  );
}
 
export default ProfileInfo;