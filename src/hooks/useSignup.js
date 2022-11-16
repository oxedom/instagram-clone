
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../firebase"

export const useSignup = () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const { dispatch} = useAuthContext()

const signup = async (email, password, username) => {
    setIsLoading(true)
    setError(null)

    try {
        //Signing up with Firebase
        const response = await createUserWithEmailAndPassword(auth, email, password)
        //Updating Username
        await updateProfile(auth.currentUser, {displayName: username})
        //SETTING Error if it exists
        setError(response.error)
        //Set loading to false
        setIsLoading(false)
        
        //Obj decunstructing Saving userobj and jwt in localstorage

        const {displayName, photoURL, user_email, accessToken, metadata, uid, } = response.user 
        const jwt = await response.user.getIdToken()
        localStorage.setItem('userInfo', JSON.stringify({displayName, photoURL, user_email, accessToken, metadata, uid, jwt}))
      
      
        //Dispatching login event to update context
        dispatch({type: "LOGIN", payload: response.user})
    }
        catch(error) {
            //catching error
            setError(error)
    }

   

    
} 
return { signup, isLoading, error}
}