//Check AUTH is middleware to check if user is logged in or not, if logged will redriect to feed, else to sign in
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";

const useCheckAuth = () => {
const [currentUser, setCurrentUser] = useState()
const navigate = useNavigate()

useEffect(() => {
  
    if(auth.currentUser === null) 
      {
        navigate('sign-up')
      }
      else
      {
        setCurrentUser(auth.currentUser)
        navigate('feed')
      }
    
  }, [currentUser])

return currentUser
}

export default useCheckAuth;