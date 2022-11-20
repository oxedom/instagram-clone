import { collection, getDocs, where, query} from 'firebase/firestore';
import { firestore } from '../firebase'



//Returns Firestore Auth users not users from collections
export async function getUserbyId(id) {

    let user = {}
    const q = query(collection(firestore, "users"), where("uid", "==", id));

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user = doc.data()
    })

    console.log(user);
    return user
  }

