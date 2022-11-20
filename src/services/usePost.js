import { collection, getDocs, where, query} from 'firebase/firestore';
import { firestore } from '../firebase'






export const usePost = () => {


    const getAllPosts =  async() => 
    {

        let posts = []
        const postsRef = collection(firestore, "posts")
        const querySnapshot = await getDocs(postsRef)
        querySnapshot.forEach((doc) => {
          posts.push(doc.data())
        })
    
        return posts

    }

    const getAllUserPosts = async (id) =>  {

        let posts = []
        const q = query(collection(firestore, "posts"), where("uid", "==", id));
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          posts.push(doc.data())
        })
    
        return posts
      }
      

    return {getAllPosts, getAllUserPosts}

  }


