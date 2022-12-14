import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img from "../../assests/pet-logo.png";
import { useNavigate } from "react-router-dom";
import { SignInService } from "../../services/SignInService";
import { LogoutService } from "../../services/LogoutService";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonState, setButtonState] = useState();

  const { signIn } = SignInService();
  const { logout } = LogoutService();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await logout();
      await signIn(email, password);
      navigate("/feed");
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestUser = () => {
    setEmail("test_jest@gmail.com");
    setPassword("jest9999");
  };
  //Changes btn-color based on password length, needs to do more things

  useEffect(() => {
    if (password.length < 6) {
      setButtonState("bg-blue-300 hover:bg-blue-300 ");
    } else {
      setButtonState("bg-blue-500 hover:bg-blue-700 ");
    }
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    handleLogin();

    setEmail("");
    setPassword("");
  }

  return (
    <div className="bg-slate-100  flex-grow ">
      <div className="flex mx-auto flex-col p-10 max-w-lg gap-5 mt-20  items-stretch bg-white border">
        <img
          alt="instagram-logo"
          src={img}
          className="object-fit md:w-9/12 self-center"
        />
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <input
            className="bg-slate-50 p-2 border-2 border-gray-100"
            placeholder="email"
            id="email"
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          ></input>
          <input
            className="bg-slate-50 p-2"
            value={password}
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
            className={`rounded text-white text-center font-bold btn p-2  ${buttonState}"`}
            type="submit"
          >
            {" "}
            Sign in{" "}
          </button>
          <div
            className={`rounded text-white  text-center font-bold btn p-2 bg-blue-500 hover:bg-blue-700`}
            onClick={handleTestUser}
          >
            {" "}
            Login with test user{" "}
          </div>
        </form>
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
