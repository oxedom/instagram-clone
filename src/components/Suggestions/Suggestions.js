import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";

const Suggestions = () => {
  const userAPI = UserService();
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(async () => {
    //Not scaleable soultion because I don't want to pay for Firebase functions to create complex queries; 
    //Just a make shift soultion to implemenet this suggestions feature!
    const users = await userAPI.getAllUsers();
    const currentUser = await userAPI.getCurrentUser()
    const filteredUsers = users.filter(u => u.uid !== currentUser.uid)

    const shuffled = filteredUsers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    const slicedUsers = shuffled.slice(shuffled.length - 4);
    
 
     setUsers(slicedUsers);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

      <div className="shadow-md border-solid text-center p-1 mt-2 slide relative rounded-lg flex w-max gap-4 bg-white  ">
        {users.map((u) => {
          return (
            <section>
              <Link to={`/profile/${u.username}`}>
                <div className="flex gap-1 flex-grow-1 flex-col items-center ">
                  <img
                    alt="suggested profile"
                    className="m-1 rounded-full object-cover aspect-ratio: auto; w-10 h-10"
                    src={u.photoURL}
                  />
                  <p> {u.username} </p>
                </div>
              </Link>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Suggestions;
