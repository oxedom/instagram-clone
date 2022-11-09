import { useEffect, useState } from 'react';
import {firestore, } from './firebase'
import { collection, getDocs } from "firebase/firestore"; 
import Navbar from './components/Navbar/Navbar';

function App() {

  const getUsers = async () => {
    let users = []
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
    users.push({...doc.data(), id: doc.id})

    });
    setUsers(users)
  }







  const [users, setUsers] = useState([])


  useEffect( ()=> {

    getUsers()
   

  }, [])

  return (
    <div className="App">
      <Navbar></Navbar>
      {users.map((user,i) => <h1 className="text-3xl font-bold underline" key={user.id}> {user.username} </h1>)}
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  );
}

export default App;
