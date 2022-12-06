import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";
import SuggestionsSkeleton from "../Skeletons/SuggestionsSkeleton";


const Suggestions = () => {
  const userAPI = UserService();
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(async () => {
    //Not scaleable soultion because I don't want to pay for Firebase functions to create complex queries;
    //Just a make shift soultion to implemenet this suggestions feature!
    const users = await userAPI.getSuggestions();
    const currentUser = await userAPI.getCurrentUser();

    const filteredUsers = users.filter((u) => u.uid !== currentUser.uid);
    if(filteredUsers.length === 5) { 
      filteredUsers.pop();
    }

    setUsers(filteredUsers);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {(!users.length > 0 )&& 
     <SuggestionsSkeleton></SuggestionsSkeleton> }

      {users.length > 0 && (
        <div className="mt-2 shadow-md border-solid text-center p-4 slide  rounded-lg grid-cols-4 grid  gap-5 w-[350px] bg-white">
          {users.map((u) => {
            return (
           
                <Link key={u.username} to={`/profile/${u.username}`}>
               
                    <img
                      width={64}
                      height={64}
                      alt="suggested profile"

                      className="m-1 rounded-full object-cover aspect-ratio:square; w-16 h-16"
                      src={u.photoURL}
                    />

             
                </Link>
         
            );
          })}
        </div>
      )}
    </>
  );
};

export default Suggestions;
