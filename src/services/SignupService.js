import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserService } from "./UserService";

export const SignupService = () => {
  const userAPI = UserService()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password, username, profileUrl, bio) => {
    setIsLoading(true);
    setError(null);

    try {
      //Signing up with Firebase
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //Updating Username
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: profileUrl,
      });
      //SETTING Error if it exists
      setError(response.error);
      //Set loading to false

      const { uid } = response.user;

      await addDoc(collection(firestore, "users"), {
        username,
        uid,
        bio: bio,
        followers: [],
        following: [],
        photoURL: profileUrl
      });

      setIsLoading(false);
    } catch (error) {
      //catching error

      setError(error);
    }
  };
  return { signup, isLoading, error };
};
