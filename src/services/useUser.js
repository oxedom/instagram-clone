import { collection, getDocs} from 'firebase/firestore';
import { firestore } from '../firebase'


export async function getAllPosts() {

    let posts = []
    const postsRef = collection(firestore, "posts")
    const querySnapshot = await getDocs(postsRef)
    querySnapshot.forEach((doc) => {
      posts.push(doc.data())
    })

    return posts
  }