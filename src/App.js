import { useEffect } from 'react';
import {firestore} from './firebase'
import { collection, getDocs } from "firebase/firestore"; 

function App() {

  const handleLihi = async () => {

    const querySnapshot = await getDocs(collection(firestore, "users"));

    querySnapshot.forEach((doc) => {
    console.log(doc.data())

    });

  }

  useEffect( ()=> {

  handleLihi()

  }, [])

  return (
    <div className="App">
      <h1> Hello Firebase</h1>
    </div>
  );
}

export default App;
