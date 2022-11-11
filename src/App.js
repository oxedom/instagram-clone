import { useEffect, useState } from 'react';
import {firestore, } from './firebase'
import { collection, getDocs } from "firebase/firestore"; 
import RouteSwitch from './RouteSwitch'
import './index.css'

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
      <RouteSwitch></RouteSwitch>
      {/* {users.map((user,i) => <h1 className="text-3xl font-bold underline" key={user.id}> {user.username} </h1>)} */}

    </div>
  );
}

export default App;
