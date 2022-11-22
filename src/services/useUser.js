import { collection, getDocs, where, query } from "firebase/firestore";
import { firestore,auth , updateProfile} from "../firebase";

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


  const updateProfileByID = async (id, updateObj) => 
  {
    //updateObj schema 
    // {
      // photoURL: 'WWW.newphoto.com.jpg'
      
    // }

    updateProfile(auth.currentUser, )
  }


    
  return { getUserbyId, getAllUsers };
}
