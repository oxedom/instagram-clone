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

    const currentUserLoggedIn = getAuth()
    const currentUserData = await getUserbyId(currentUserLoggedIn.currentUser.uid)
    const docID = currentUserData.id

    const docRef = doc(firestore, "users", docID);

    if(currentUserData.following.includes(userToFollowID)) 
    {
      const updatedFollowingArray = currentUserData.following.filter(f => f !== userToFollowID)

      const res = await updateDoc(docRef, { following: updatedFollowingArray });
      console.log(res);
    }
    else
    {
      await updateDoc(docRef, { following: arrayUnion(userToFollowID)})

   
    }}

  



  return { getUserbyId, getAllUsers, updateUser , getUserByUsername, toogleFollow};
}

