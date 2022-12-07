import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";

const ListUser = (props) => {
    const {id} = props
    const userAPI = UserService();    
    const [user, setUser] = useState(false)
    const fetchData = useCallback(async () => {
        const data = await userAPI.getUserbyId(id)
        setUser(data)
    }, [])

    useEffect(()=> {
        fetchData()
    }, [])

    return (
        <Link to={`/profile/${user.username}`}>
    <div className="flex m-1 gap-2 bg-white rounded-lg p-2 h-auto items-center border ">
        {user && <>
      
            <img alt={user.username} className="w-16 h-16 md:w-20 md:h-20  object-cover  rounded-full "src={user.photoURL}/>
            <p> {user.username} </p>
     
        </> 
        }
           
</div> 
</Link> );
}
 
export default ListUser;