import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../../firebase'
import { useState } from "react";

const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmit(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((cred) => { 
            console.log(cred, cred.user);
        })
        .catch((err) => { console.log(err.message); })
  
        setEmail('')
        setPassword('')
    }


    return ( <div className="bg-slate-100">
        <form  className='flex mx-auto flex-col p-4 max-w-2xl gap-3' onSubmit={handleSubmit}>
        <input id='email' type="email" onChange={(e) => {setEmail(e.target.value)} } name="email"></input>
        <input id='password' min="6" type="password" onChange={(e) => {setPassword(e.target.value)} } name="password"></input>
        <button type="submit"> Sign in  </button>
        </form>
    </div>  );
}
 
export default Signin;