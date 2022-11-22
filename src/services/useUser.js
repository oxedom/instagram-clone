import { collection, getDocs, where, query, updateDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth"
import { firestore,auth } from "../firebase";

//Reasons to get a user by ID
//Getting his data for a profile picture and name for comments for example

//Returns Firestore Auth users not users from collections
export function useUser() {



  const getUserbyId = async (id) => {
    let user = {};
    const q = query(collection(firestore, "users"), where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user = doc.data();
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


  const updateUser = async (updatedObj) => 
  {
    
    //Update user function updates any key value that is inside the user DOC
    //Be warry with making sure the right caps lock is on and not overriding existing 
    //props by mistake, need to make sure to add SANTIZATOIN on this function.
    
    let id = undefined
    const q = query(collection(firestore, 'users'), where('uid', "==" ,`${auth.currentUser.uid}` ))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => 
      {
        id = doc.id
      })
    const userRef = doc(firestore, 'users', id)
     await updateDoc(userRef, updatedObj)
    

 

  }


    
  return { getUserbyId, getAllUsers, updateUser};
}
