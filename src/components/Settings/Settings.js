import { useEffect, useState } from "react";
import { useUser } from "../../services/useUser";


const Settings = () => {

    const [username,setUsername] = useState('')
    const [profileUrl, setProfileUrl] = useState('')
    const { updateUser} = useUser()

    const handleSubmit = (e) => {
        

        e.preventDefault()
        updateUser({username: username })
        

    }



    return ( <div className="flex-grow gap-3 flex justify-center flex-col items-center">
              <form
        onSubmit={handleSubmit}
        className="border p-10 rounded bg-slate-200  flex gap-4 flex-col"
      >
        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          placeholder="New Profile Image URL"
          maxLength={250}
          value={profileUrl}
          type="text"
          onChange={(e) => {
            setProfileUrl(e.target.value);
          }}
        ></input>

        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          maxLength={25}
          placeholder="Username"
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <button className="btn bg-slate-50" type="submit">
          {" "}
          Update Account {" "}
        </button>
      </form>
    </div> );
}
 
export default Settings;