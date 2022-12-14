import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { PostService } from "./PostService";
import { useNavigate } from "react-router";
import { UserService } from "./UserService";
export const SignupService = () => {
  const navigate = useNavigate();

  const postApi = PostService();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const userAPI = UserService();

  const signup = async (email, password, username, imgFile, bio) => {
    // await logout()
    await auth.signOut();

    setIsLoading(true);

    setError(null);
    try {
      //Signing up with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      //catching error
      setError(error);
    }
    const noUser = await userAPI.getUserByUsername(username.trim());
    const noUserWithID = await userAPI.getUserbyId(auth.currentUser.uid);

    if (noUser === undefined && noUserWithID === undefined) {
      onAuthStateChanged(auth, async (user) => {
        //Uploading photo to firebase STORAGE and then getting a URL;
        const profileUrl = await postApi.uploadImage(imgFile);

        //Updating Displayname and Adding a URL to profile photo
        await updateProfile(auth.currentUser, {
          displayName: username.trim(),
          photoURL: profileUrl.trim(),
        });

        const { uid } = user;

        await addDoc(collection(firestore, "users"), {
          username: username.trim(),
          uid: uid,
          bio: bio,
          followers: [],
          following: [],
          photoURL: profileUrl,
        });
        setTimeout(() => {
          navigate("/feed");
        }, 0);
        setIsLoading(false);
      });
    }
  };
  return { signup, isLoading, error };
};
