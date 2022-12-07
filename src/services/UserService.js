import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  arrayUnion,
  limit,
} from "firebase/firestore";

import { auth, firestore } from "../firebase";

export function UserService() {
  const getUserbyId = async (id) => {
    try {
      let user = undefined;
      const q = query(collection(firestore, "users"), where("uid", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user = { ...doc.data(), id: doc.id };
      });

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const searchUser = async (text) => {
    let queryUsers = [];
    if (text !== "") {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where(
            "username",
            ">=",
            text.toLowerCase(),
            where("username", "=<", text.toLowerCase())
          ),
          limit(6)
        );
        // const q = query(usersRef, orderBy("username"),startAt(text.toLowerCase()),limit(5))

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          queryUsers.push(doc.data());
        });
      } catch (error) {
        console.error(error);
      }
    }

    queryUsers = queryUsers.filter(
      (u) => u.username !== auth.currentUser.displayName
    );

    return queryUsers;
  };

  const getAllUsers = async () => {
    try {
      let users = [];

      const usersRef = collection(firestore, "users");

      const querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      return users;
    } catch (error) {
      console.error(error);
    }
  };

  const getSuggestions = async () => {
    try {
      let users = [];

      const usersRef = collection(firestore, "users");
      const q = query(usersRef, limit(50));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      users = users
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      const sliced = [];
      for (let index = 0; index < 5; index++) {
        sliced.push(users[index]);
      }
      return sliced;
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    return auth.currentUser;
  };

  const getUserByUsername = async (username) => {
    try {
      let user = [];
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      user = user[0];
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const toogleFollow = async (userToFollowID) => {
    try {
      //Gets Data of current user logged in
      const currentUserLoggedIn = getAuth();

      //Get USER DATA for following array
      const currentUserData = await getUserbyId(
        currentUserLoggedIn.currentUser.uid
      );

      //GET USER DATA FOR Followers Array
      const currentFollowingData = await getUserbyId(userToFollowID);

      //Doc ID for doc Refs
      const userFollowing_ID = currentUserData.id;
      const usertoFollow_ID = currentFollowingData.id;

      //DOC refs
      const userFollowing_DocRef = doc(firestore, "users", userFollowing_ID);
      const userFollowers_DocRef = doc(firestore, "users", usertoFollow_ID);

      if (currentUserData.following.includes(userToFollowID)) {
        //Updates the array of following for the user that wants to follow;
        const updatedFollowingArray = currentUserData.following.filter(
          (f) => f !== userToFollowID
        );
        const updatedFollowersArray = currentFollowingData.followers.filter(
          (f) => f !== currentUserLoggedIn.currentUser.uid
        );

        await updateDoc(userFollowing_DocRef, {
          following: updatedFollowingArray,
        });
        await updateDoc(userFollowers_DocRef, {
          followers: updatedFollowersArray,
        });
      } else {
        await updateDoc(userFollowing_DocRef, {
          following: arrayUnion(userToFollowID),
        });
        await updateDoc(userFollowers_DocRef, {
          followers: arrayUnion(currentUserLoggedIn.currentUser.uid),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getUserbyId,
    getAllUsers,
    getSuggestions,
    getUserByUsername,
    toogleFollow,
    getCurrentUser,
    searchUser,
  };
}
