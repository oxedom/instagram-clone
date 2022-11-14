import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth} from '../../firebase'
import { useEffect, useState } from "react";
import img from '../../assests/text-logo.png'
const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [buttonState, setButtonState] = useState()

    useEffect(() => {
    if(password.length < 6) { setButtonState('bg-blue-300')}
    else { setButtonState('bg-blue-500')}
    }, [email,password])

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
        
        <div className="flex mx-auto flex-col p-10 max-w-2xl gap-5 mt-10  bg-white"> 
        <img src={img} className="object-scale-down"/>
        <form className="flex flex-col gap-3 p-1" onSubmit={handleSubmit}>
              

        <input className="bg-slate-50 p-2" placeholder='email'  id='email' type="email" onChange={(e) => {setEmail(e.target.value)} } name="email"></input>
        <input className="bg-slate-50 p-2" placeholder='password' id='password' min="6" type="password" onChange={(e) => {setPassword(e.target.value)} } name="password"></input>
        <button className={`rounded text-white font-bold btn p-2 ${buttonState} hover:bg-blue-700" type="submit`}> Sign in  </button>
        </form>
        

        </div>
 
    </div>  );
}
 
export default Signin;