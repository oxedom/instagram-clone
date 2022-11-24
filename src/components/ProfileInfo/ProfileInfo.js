
import { useEffect, useState } from 'react';
import threeDots from '../../assests/dots.png'
const ProfileInfo = (props) => {
    const { posts } = props
    const { photoURL, username, bio, following, followers} = props.props




    return ( <div className="bg-slate-100 flex flex-col">

        
        <div className="m-4 flex justify-around ">
        
        {/* profile Pictutre */}
        <img className="rounded-full object-cover aspect-ratio: auto; w-20 h-20" src={photoURL} alt="profile"/>


        {/* Username and follow button */}
        <div className="flex gap-2 flex-col justify-self-center">

        <div className="flex gap-5">
        <h1 className="font-meduim text-4xl"> {username} </h1>

        <div className="flex items-center" >
        <img src={threeDots} alt='settings' />
        </div>

   
   
        </div>
  

        <div className="button border flex justify-center p-0.5  text-center"> 
        <span className="font-medium">  Follow </span>
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
        <span className="text-sm font-semibold"> {} </span>
        <span className="text-sm"> followers </span>
        </div>

        <div className="flex flex-col justify-center items-center" >
        <span className="text-sm font-semibold"> {} </span>
        <span className="text-sm"> following </span>
        </div>

        


        </div>

    </div>  );
}
 
export default ProfileInfo;