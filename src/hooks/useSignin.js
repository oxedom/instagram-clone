
import { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase"

export const useSignIn = () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)


const signIn = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
        //Signing up with Firebase
        const response = await signInWithEmailAndPassword(auth, email, password)
        //Updating Username
        //SETTING Error if it exists
        setError(response.error)
        //Set loading to false
        setIsLoading(false)
        
        //Obj decunstructing Saving userobj and jwt in localstorage

        const {displayName, photoURL, user_email, accessToken, metadata, uid, } = response.user 
        const jwt = await response.user.getIdToken()
        localStorage.setItem('userInfo', JSON.stringify({displayName, photoURL, user_email, accessToken, metadata, uid, jwt}))
      
      
    
      

    }
        catch(error) {
            //catching error
            setError(error)
    }

   

    
} 
return { signIn, isLoading, error}
}