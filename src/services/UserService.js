import { getAuth, updateProfile } from "firebase/auth";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../firebase";
import uniqid from "uniqid";

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
            ">=",text.toLowerCase(),
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

      users = users.filter(u => u.uid !== auth.currentUser.uid)
      users = users
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);



      return [users[0], users[1],users[2], users[3]] ;
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

  const uploadImage = async (imgFile) => {
    const imageRef = ref(
      storage,
      `images/${uniqid(imgFile.name) + imgFile.name}`
    );
    const uploadedIMGURL = await uploadBytes(imageRef, imgFile);
    const url = await getDownloadURL(uploadedIMGURL.ref);
    return url;
  };

  const getAllFollowersByUsername = async (username) => {

    // const populated = await Promise.all(followers.map(getUserbyId))
    const userData = await getUserByUsername(username)
    const {followers} = userData;

    return followers
  }

  // const getUserLikesById = async (uid) => {

  //   let likesWithData = [];
  //   //Querying all of the users posts
  //   const q = query(collection(firestore, "posts"), where("uid", "==",  auth.currentUser.uid));
  //   //Looping over each post and extracting the like array if it has a length bigger than 0
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {  
  //     //Taking the IMG URL from the post and likes Array
  //     const {likes,imgUrl} = doc.data()
  //     const postLikes = {likes, imgUrl }

  //     if(postLikes.likes.length > 0) 
  //     {
  //       likesWithData.push(postLikes)
  //     }

  //   });

  //   const  populatedLikes = await Promise.all(likesWithData.likes.map((l => (getUserbyId(l.uid)))))
    
  //   populatedLikes = populatedLikes.sort(function (a, b) {
  //     return b.date - a.date;
  //   });

  //   return populatedLikes;

  // }

  const getAllFollowingByUsername = async (username) => {

    const userData = await getUserByUsername(username)
    const {following} = userData;

    return following
  }

  const updateProfilePicutre = async(selectedImage) => 
  {
    const imageUrl = await uploadImage(selectedImage)
    const auth = getAuth();
    const userDoc = await getUserbyId(auth.currentUser.uid)

    const userRef = doc(firestore, 'users', userDoc.id )
  
   await updateDoc(userRef, { photoURL: imageUrl})
    await updateProfile(auth.currentUser, {photoURL: imageUrl } )

  }


  const toogleFollow = async (userToFollowID) => {
    try {
      //Gets Data of current user logged in
      const currentUserLoggedIn = getAuth();

      //Get USER DATA for following arrayim
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
    getAllFollowersByUsername,
    toogleFollow,
    getCurrentUser,
    updateProfilePicutre,
    getAllFollowingByUsername,
    // getUserLikesById,
    searchUser,
  };
}
