
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth, firestore } from "../firebase"
import { addDoc, collection } from "firebase/firestore";



export const useSignup = () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const { dispatch} = useAuthContext()

const signup = async (email, password, username) => {
    console.log('sign up from useSIgnup is running');
    setIsLoading(true)
    setError(null)

    try {
        console.log('sign up from useSIgnup is running');
        //Signing up with Firebase
        const response = await createUserWithEmailAndPassword(auth, email, password)
        //Updating Username
        await updateProfile(auth.currentUser, {displayName: username})
        //SETTING Error if it exists
        console.log('PARTY IS THE USA');
        setError(response.error)
        //Set loading to false
        console.log('sign up from useSIgnup is running');
        
        //Obj decunstructing Saving userobj and jwt in localstorage

        const {displayName, photoURL, user_email, accessToken, metadata, uid, } = response.user 
        console.log('PARTY IS THE USA');
        const jwt = await response.user.getIdToken()

        const docRef =  await addDoc(collection(firestore, "users"), {
            username,
            uid,
            bio: 'Default bio'
        })
        console.log(docRef);
        console.log(docRef);
        console.log(docRef);
        console.log(docRef);

        localStorage.setItem('userInfo', JSON.stringify({displayName, photoURL, user_email, accessToken, metadata, uid, jwt}))
        setIsLoading(false)
 
      
        //Dispatching login event to update context
        dispatch({type: "LOGIN", payload: response.user})
    }
        catch(error) {
            //catching error
            console.log(error);
            setError(error)
    }

   

    
} 
return { signup, isLoading, error}
}