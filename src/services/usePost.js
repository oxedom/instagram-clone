import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { useUser } from "./useUser";

export const usePost = () => {



  const userAPI = useUser();

  // const checkAuth = async () => 
  // {
  //   const answer = undefined
  //   auth.onAuthStateChanged(async (user) => 
  //   {
  //     if(user) { answer = true}
  //     else ( answer = false)
  //   })
  //   return answer
  // }

  const getPostByID = async (id) => {
   
    let post = {};
    const postRef = doc(firestore, "posts", id);
    const docSnap = await getDoc(postRef);

    post = {...docSnap.data(), id}
    return post;
  };

  const getAllPosts = async () => {
    let posts = [];
    const postsRef = collection(firestore, "posts");
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });

    return posts;
  };

  const getAllUserPosts = async (id) => {
    let posts = [];
    const q = query(collection(firestore, "posts"), where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });

    return posts;
  };

  const getAllFollowingPosts = async (id) => {
    const followersPosts = [];
    const user = await userAPI.getUserbyId(id);

    user.following.forEach(async (follower) => {
      const followerPosts = await getAllUserPosts(follower);
      followerPosts.push(...followerPosts);
    });
    //ID of the user who follows people

    return followersPosts;
  };

  const postPost = async (text, imgUrl) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const currentUID = user.uid;
        const data = {
          text: text,
          imgUrl: imgUrl,
          likes: [],
          comments: [],
          uid: currentUID,
          Date: Date.now(),
        };
        const docRef = await addDoc(collection(firestore, "posts"), {
          ...data,
        });

        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      }
      else { return }

    });
  };

  const deltePost = async (id) => {
    if (!id || typeof id !== "string") {
      throw "ID not valid or supplied when calling deletePostMethod";
    } else {
      const docRef = doc(firestore, "posts", id);
      await deleteDoc(docRef);
      console.log("doc with ID" + id + "Has been deleted");
    }
  };

  const tooglelikePost = async (postID) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const currentUID = user.uid;
        const post = await getPostByID(postID)
        console.log(post);
        const docRef = doc(firestore, "posts", postID);
        
        if(!post.likes.includes(currentUID)) 
        {
          console.log('Adding doc');
          await updateDoc(docRef, { likes: arrayUnion(currentUID) });
        }
        else 
        {
          console.log('Removing Doc');
          await updateDoc(docRef, {likes: arrayRemove(currentUID)})
        }
        
    
      }
      if (!user) {
        return;
      }
    });


  };


  return {
    getAllPosts,
    getAllUserPosts,
    getAllFollowingPosts,
    postPost,
    deltePost,
    getPostByID,
    tooglelikePost,
  };
};
