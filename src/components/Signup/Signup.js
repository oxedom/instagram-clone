import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../assests/sam-logo.png";
import { useNavigate } from "react-router-dom";
import { SignupService } from "../../services/SignupService";
import UploadButton from "../UploadButton/UploadButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [sent, setSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [buttonState, setButtonState] = useState();
  //eslint-disable-next-line
  const { signup, error, isLoading } = SignupService();
  const navigate = useNavigate();

  useEffect(() => {
    if (password.length < 6) {
      setButtonState("bg-blue-300");
    } else {
      setButtonState("bg-blue-500");
    }
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(email, password, username, selectedImage, bio).then(() => {
        navigate("/feed");
      });
    } catch (err) {
      console.error(err);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <>
      {" "}
      {!isLoading && (
        <div className=" xl:bg-slate-100 flex-grow  justify-center">
          <div className="flex mx-auto flex-col p-5 max-w-lg gap-5 md:p-20 items-stretch mt-20 bg-white xl:border  ">
            <div className="flex justify-center flex-col gap-3 ">
              <img
                src={img}
                alt="Instagram logo"
                className="object-scale-down md:w-9/12 self-center"
              />
              <h2 className="text-center">
                {" "}
                Sign up to see photos and videos from your friends{" "}
              </h2>
            </div>

            <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
              <input
                className="bg-slate-50 p-2 border-2 border-gray-100"
                placeholder="Email"
                id="email"
                type="email"
                max="50"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
              ></input>
              <input
                className="bg-slate-50 p-2 border-2 border-gray-100"
                placeholder="Username"
                id="username"
                max="30"
                min="10"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                name="username"
              ></input>

              <UploadButton
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              ></UploadButton>

              <input
                className="bg-slate-50 p-2 border-2 border-gray-100"
                placeholder="Bio"
                id="bio"
                type="text"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                name="bio"
              ></input>

              <input
                className="bg-slate-50 p-2"
                placeholder="Password"
                id="password"
                min="6"
                max="100"
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
                Sign up{" "}
              </button>

              {error && (
                <div className="text-center  text-red-700">
                  {" "}
                  Error signing up
                </div>
              )}
            </form>
          </div>

          <div className=" flex mx-auto p-10 max-w-lg items-center justify-center gap-5 mt-10 border bg-white">
            <p> Have an account? </p>{" "}
            <Link className="text-blue-500 font-medium" to="/sign-in">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
