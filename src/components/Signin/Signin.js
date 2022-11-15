import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import img from "../../assests/text-logo.png";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth"
import { useLocation } from "react-router-dom";

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [buttonState, setButtonState] = useState();
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { login } = useAuth()



  useEffect(() => {
    if (password.length < 6) {
      setButtonState("bg-blue-300");
    } else {
      setButtonState("bg-blue-500");
    }
  }, [email, password]);

  async function handleSubmit (e) {
    e.preventDefault()
    
    try {
      const cred =  await signInWithEmailAndPassword(auth, email, password)
      if(cred.user.uid.length > 10) {
        console.log(cred.user.uid);
        login().then(() => { 
          console.log('navigating to feed or path' + state?.path);
          navigate(state?.path || "/feed")})
      }
    }
      catch(error) {
        console.log('ERROR LOGGING IN');
        console.log(error)
        setLoginError(true);
      }
    
        
 
  
      


    setEmail("");
    setPassword("");
  }

  return (

    <div className="bg-slate-100  flex-grow ">
      <div className="flex mx-auto flex-col p-20 max-w-lg gap-5 mt-20  items-stretch bg-white border">
        <img alt="instagram-logo" src={img} className="object-scale-down md:w-9/12 self-center" />
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <input
            className="bg-slate-50 p-2 border-2 border-gray-100"
            placeholder="email"
            id="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          ></input>
          <input
            className="bg-slate-50 p-2"
            placeholder="password"
            id="password"
            min="6"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          ></input>
          <button
            className={`rounded text-white font-bold btn p-2 ${buttonState} hover:bg-blue-700" type="submit`}
          >
            {" "}
            Sign in{" "}
          </button>
        </form>
        {loginError && (
          <p className="text-center text-red-500">
            {" "}
            Sorry, your password was incorrect. Please double-check your
            password
          </p>
        )}
      </div>

      <div className=" flex mx-auto p-10 max-w-lg items-center justify-center gap-5 mt-10 border bg-white">
        <p> Don't have an account? </p>{" "}
        <Link className="text-blue-500 font-medium" to="/sign-up">
          {" "}
          Sign up
        </Link>
      </div>
    </div>
  );

};

export default Signin;
