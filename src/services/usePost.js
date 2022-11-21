import { collection, getDocs, where, query , addDoc, deleteDoc, doc} from "firebase/firestore";
import { firestore } from "../firebase";
import { useUser } from "./useUser";

export const usePost = () => {
  const userAPI = useUser();

  const getAllPosts = async () => {
    let posts = [];
    const postsRef = collection(firestore, "posts");
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    
    return posts;
  };

  const getAllUserPosts = async (id) => {
    let posts = [];
    const q = query(collection(firestore, "posts"), where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
      posts.push(doc.data());
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

  const postPost = async (text, imgUrl ) => 
  {
    const data = {    text: text,  imgUrl: imgUrl, uid: JSON.parse(localStorage.getItem('userInfo')).uid}
    const docRef = await addDoc(collection(firestore, 'posts'), 
    {
        ...data
    });
    console.log("Document written with ID: ", docRef.id); 
    return docRef.id
  }

  const deltePost = async (id) => 
  {
    if(!id || typeof id !== 'string') { throw 'ID not valid or supplied when calling deletePostMethod'}
    else 
    {
        const docRef = doc(firestore, 'posts', id);
        await deleteDoc(docRef)
        console.log('doc with ID' + id + 'Has been deleted');
    }


  }

  return { getAllPosts, getAllUserPosts, getAllFollowingPosts, postPost, deltePost};
};
