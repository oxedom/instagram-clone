import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { PostService } from "./PostService";


export const SignupService = () => {
;
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
      )
    }
   catch (error) {
    //catching error
    setError(error);
  }

      onAuthStateChanged(auth, async (user) => {
        const profileUrl = await postApi.uploadImage(imgFile);

                //Updating Displayname and Adding a URL to profile photo
        await updateProfile(auth.currentUser, {
          displayName: username.trim(),
          photoURL: profileUrl.trim(),
        });

        const { uid } = user

        await addDoc(collection(firestore, "users"), {
          username: username.trim(),
          uid: uid,
          bio: bio,
          followers: [],
          following: [],
          photoURL: profileUrl,
        });

        setIsLoading(false);



      })
        //Uploading photo to firebase STORAGE and then getting a URL;


 
  };
  return { signup, isLoading, error };
};
