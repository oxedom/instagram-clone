import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserService } from "./UserService";
import { PostService } from "./PostService";

export const SignupService = () => {
  const userAPI = UserService();
  const postApi = PostService();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password, username, imgFile, bio) => {
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
      const profileUrl = await postApi.uploadImage(imgFile);
      await updateProfile(auth.currentUser, {
        displayName: username.trim(),
        photoURL: profileUrl.trim(),
      });
      //SETTING Error if it exists
      setError(response.error);
      //Set loading to false

      const { uid } = response.user;

      await addDoc(collection(firestore, "users"), {
        username: username.trim(),
        uid,
        bio: bio,
        followers: [],
        following: [],
        photoURL: profileUrl,
      });

      setIsLoading(false);
    } catch (error) {
      //catching error

      setError(error);
    }
  };
  return { signup, isLoading, error };
};
