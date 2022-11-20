
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth, firestore } from "../firebase"
import { addDoc, collection } from "firebase/firestore";



export const useSignup = () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)


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
        //Obj decunstructing Saving userobj and jwt in localstorage
        const {displayName, photoURL, user_email, accessToken, metadata, uid, } = response.user 

        const jwt = await response.user.getIdToken()

        await addDoc(collection(firestore, "users"), {
            username,
            uid,
            bio: 'Default bio'
        })

        localStorage.setItem('userInfo', JSON.stringify({displayName, photoURL, user_email, accessToken, metadata, uid, jwt}))

        setIsLoading(false)

    }
        catch(error) {
            //catching error
    
            setError(error)
    }

   

    
} 
return { signup, isLoading, error}
}