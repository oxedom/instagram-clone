import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserService } from "../../services/UserService";

const ListUser = (props) => {
    const {id} = props
    const userAPI = UserService();    
    const [user, setUser] = useState({})
    const fetchData = useCallback(async () => {
        const data = await userAPI.getUserbyId(id)
   
        setUser(data)
    }, [])

    useEffect(()=> {

        fetchData()
    }, [])

    return (
        <>{user &&
        
        
        
        
        <>
            <div className="m-1 gap-2 bg-white rounded-lg p-2   ">
            <Link className="flex items-center gap-2"> 
    
            <img alt={user.username} className="w-16 h-16 md:w-20 md:h-20  object-cover  rounded-full "src={user.photoURL}/>
            <p> {user.username} </p>
            </Link>
            </div> 
        </> 




        }
           


           </>
);
}
 
export default ListUser;