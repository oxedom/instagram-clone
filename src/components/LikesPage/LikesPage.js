import { useCallback, useEffect } from "react";
import { UserService } from "../../services/UserService";

const LikesPages = () => {

    const userAPI = UserService()
    const [likes, setLikes] = []

    const fetchData = useCallback(async () => {
        const data = await userAPI.getAllLikes();
        console.log(data );

    }, [])
    
    useEffect(() => {
        fetchData()
    },[ ])


    return ( <div>

    </div> );
}
 
export default LikesPages;