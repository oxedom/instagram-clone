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
} from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { useUser } from "./useUser";

export const usePost = () => {
  const userAPI = useUser();

  const getPostByID = async (id) => {
    try {
      let post = {};
      const postRef = doc(firestore, "posts", id);
      const docSnap = await getDoc(postRef);

      post = { ...docSnap.data(), id };
      return post;
    } catch (error) {}
  };

  const getAllPosts = async () => {
    try {
      let posts = [];
      const postsRef = collection(firestore, "posts");
      const querySnapshot = await getDocs(postsRef);
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });

      return posts;
    } catch (error) {}
  };

  const getAllUserPosts = async (id) => {
    try {
      let posts = [];
      const q = query(collection(firestore, "posts"), where("uid", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });

      return posts;
    } catch (err) {
      console.error(err);
    }
  };

  const getAllFollowingPosts = async (id) => {
    try {
      const followersPosts = [];
      const user = await userAPI.getUserbyId(id);

      user.following.forEach(async (follower) => {
        const followerPosts = await getAllUserPosts(follower);

        followerPosts.push(...followerPosts);
      });
      //ID of the user who follows people

      return followersPosts;
    } catch (err) {
      console.error(err);
    }
  };

  const postPost = async (text, imgUrl) => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const currentUID = user.uid;
          const data = {
            text: text,
            imgUrl: imgUrl,
            likes: [],
            comments: [],
            uid: currentUID,
            date: Date.now(),
          };
          const docRef = await addDoc(collection(firestore, "posts"), {
            ...data,
          });

          console.log("Document written with ID: ", docRef.id);
          return docRef.id;
        } else {
          return;
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  //Deletes post
  const deltePost = async (id) => {
    if (!id || typeof id !== "string") {
      throw new Error("ID not valid or supplied when calling deletePostMethod");
    } else {
      const docRef = doc(firestore, "posts", id);
      try {
        await deleteDoc(docRef);
        console.log("doc with ID" + id + "Has been deleted");
      } catch (err) {
        console.error(err);
      }
    }
  };

  //Toogles like posts
  const tooglelikePost = async (postID) => {
    try {
      //Checks if the user is authed;
      auth.onAuthStateChanged(async (user) => {
        //If user
        if (user) {
          //Query post data
          const post = await getPostByID(postID);
          //date obj
          const today = new Date();
          //Reference to the post doc
          const docRef = doc(firestore, "posts", postID);

          //Functions simllar to an include method but works on objects, (INCLUDE WORKS ONLY ON ARRAYS)
          if (!post.likes.some((l) => l.uid === user.uid)) {
            //UpdateDoc is a firebase method, arrayUnion is simllar to push in Javascript, pushing the USERID and date of LIKE
            await updateDoc(docRef, {
              likes: arrayUnion({ uid: user.uid, date: today.getTime() }),
            });
          } else {
            //Runs if the include method was false
            //Removes the like object by searching for the UID in the posts likes array;
            const updatedLikesArray = post.likes.filter(
              (l) => l.uid !== user.uid
            );
            //Updates Doc with new filtered array;
            const res = await updateDoc(docRef, { likes: updatedLikesArray });
            return res;
          }
        }
        if (!user) {
          return;
        }
      });
    } catch (error) {}
  };

  const addComment = async (postID, text) => {
    if(text.length > 250) { return new Error('Too much text')}
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const today = new Date();
          //Reference to the post doc
          const docRef = doc(firestore, "posts", postID);

          await updateDoc(docRef, {
            comments: arrayUnion({
              uid: user.uid,
              date: today.getTime(),
              text: text,
              username: user.displayName,
            }),
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getAllPosts,
    getAllUserPosts,
    getAllFollowingPosts,
    postPost,
    deltePost,
    getPostByID,
    tooglelikePost,
    addComment,
  };
};
