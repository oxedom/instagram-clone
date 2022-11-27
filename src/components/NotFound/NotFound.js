import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import {  useNavigate } from "react-router";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => 
    {   
    onAuthStateChanged(auth, (user) => 
    {
        if(user) 
        {
            navigate('/feed')
        }
        if(!user) 
        {
            navigate('/sign-in')
        }
    })

    },[])

    return ( <div className="bg-slate-50 flex flex-col items-center gap-1 mt-5 text-center">

        <h1 className="font-bold">Sorry this page isn't available</h1>
        <p> Please 
            <Link className="text-blue-500" to='/sign-in'> sign in.</Link>
        </p>
    </div>);
}
 
export default NotFound;