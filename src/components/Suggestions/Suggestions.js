
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../services/useUser";

const Suggestions = () => {

    const userAPI = useUser()
    const [users, setUsers] = useState([])

    const fetchData = useCallback(async () => {
        const users = await userAPI.getAllUsers()

        //shuffle
        const shuffled = users.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        const slicedUsers = shuffled.slice(shuffled.length-4)
        setUsers(slicedUsers)

    }, [])

    useEffect(() => {
        fetchData()
    }, [])


    return ( 
      <>
                   <h1> People you may know...</h1> 
                   <div className="shadow-md border-solid text-center p-1 mt-2 slide relative rounded-lg flex w-max gap-4 bg-white  ">
 
       {users.map((u) => { return <section> 
        
          <Link to={`/profile/${u.username}`}>
            <div className="flex gap-1 flex-col items-center ">
              <img className="m-1 rounded-full object-cover aspect-ratio: auto; w-10 h-10" src={u.photoURL}/>
              <p> {u.username} </p>
            </div>
          </Link>
       </section>})}
  
      </div>

      </>
          
 )
}
 
export default Suggestions;