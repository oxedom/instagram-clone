import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../../firebase'
import { useState } from "react";
import img from '../../assests/text-logo.png'
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


    return ( <div className="bg-slate-100 p-10">
        
        <div className="flex mx-auto flex-col p-4 max-w-2xl gap-3 mt-10"> 



        </div>
        <form  className='flex mx-auto flex-col p-4 max-w-2xl gap-3 mt-10'  onSubmit={handleSubmit}>
        
        <img src={img} className="object-scale-down"/>
        <input id='email' type="email" onChange={(e) => {setEmail(e.target.value)} } name="email"></input>
        <input id='password' min="6" type="password" onChange={(e) => {setPassword(e.target.value)} } name="password"></input>
        <button className="rounded-full text-white font-bold btn p-2 bg-blue-500 hover:bg-blue-700" type="submit"> Sign in  </button>
        </form>
    </div>  );
}
 
export default Signin;