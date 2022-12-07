
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router";
import { UserService } from "../../services/UserService";
import backIcon from "../../assests/backicon.png";
import ListUser from "../ListUser/ListUser";




const Followers = () => {

    const [followers, setFollowers] = useState([])
    const params = useParams()
    const userAPI = UserService();
    const navigate = useNavigate()
    const handleBack = () => { navigate(-1) }
    const {username} = params


    const fetchData =  async () => {
        
        const data = await userAPI.getAllFollowersByUsername(username)
        setFollowers(data)
    }

    useEffect(() => {
  
        fetchData();
        return () => { setFollowers([])}
    }, [])  

     

    return ( 
        <div>

  
    <div className="flex flex-col gap-2 w-[300px] sm:w-[350px] bg-white mt-4 rounded-lg">
        <div className="flex items-center p-1">
        <img onClick={handleBack} className="w-8 h-8 md:w-12 md:h-12 " src={backIcon}/>
        <h1 className="text-xl font-bold bg m-1 text-black  rounded-lg">  {username} followers </h1>
        </div>

        <hr></hr>
    
        {followers.map((f) => <ListUser key={f} id={f}></ListUser>)}


    </div> 
    </div>);
}
 
export default Followers;