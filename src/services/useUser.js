import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";

//Reasons to get a user by ID
//Getting his data for a profile picture and name for comments for example

//Returns Firestore Auth users not users from collections
export function useUser() {
  const getUserbyId = async (id) => {
    let user = {};
    const q = query(collection(firestore, "users"), where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user = {...doc.data(), id: doc.id};
    });

    return user;
  };

  const getAllUsers = async () => {
    let users = [];

    const usersRef = collection(firestore, "users");

    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  };

  const updateUser = async (updatedObj) => {
    //Update user function updates any key value that is inside the user DOC
    //Be warry with making sure the right caps lock is on and not overriding existing
    //props by mistake, need to make sure to add SANTIZATOIN on this function.

    let id = undefined;
    const q = query(
      collection(firestore, "users"),
      where("uid", "==", `${auth.currentUser.uid}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    const userRef = doc(firestore, "users", id);
    await updateDoc(userRef, updatedObj);
  };

  const getUserByUsername = async (username) => 
  {
    let user = []
    const q = query(collection(firestore, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user.push({ ...doc.data(), id: doc.id });
    });
    user = user[0];
    return user;
  }

  const toogleFollow = async (userToFollowID) => 
  {

    //Gets Data of current user logged in 
    const currentUserLoggedIn = getAuth()

    //Get USER DATA for following array
    const currentUserData = await getUserbyId(currentUserLoggedIn.currentUser.uid)

    //GET USER DATA FOR Followers Array
    const currentFollowingData = await getUserbyId(userToFollowID)
    console.log(currentFollowingData);

    //Doc ID for doc Refs
    const userFollowing_ID = currentUserData.id
    const usertoFollow_ID = currentFollowingData.id


    //DOC refs
    const userFollowing_DocRef = doc(firestore, "users", userFollowing_ID);
    const userFollowers_DocRef = doc(firestore, "users", usertoFollow_ID)

    if(currentUserData.following.includes(userToFollowID)) 
    {
      //Updates the array of following for the user that wants to follow;
      const updatedFollowingArray = currentUserData.following.filter(f => f !== userToFollowID)
      const updatedFollowersArray = currentFollowingData.followers.filter(f => f !== currentUserLoggedIn.currentUser.uid)
      
       await updateDoc(userFollowing_DocRef, { following: updatedFollowingArray });
       await updateDoc(userFollowers_DocRef, { followers: updatedFollowersArray });
      


    }
    else
    {
      await updateDoc(userFollowing_DocRef, { following: arrayUnion(userToFollowID)})
      await updateDoc(userFollowers_DocRef, { followers: arrayUnion(currentUserLoggedIn.currentUser.uid)})
      console.log('YES');
      console.log(usertoFollow_ID, userFollowing_ID);
   
    }}

  



  return { getUserbyId, getAllUsers, updateUser , getUserByUsername, toogleFollow};
}

