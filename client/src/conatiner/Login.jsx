import React, { useState } from "react";
import { back3, Logo } from "../assets";
import { LoginInput } from "../Components";
import { MdEmail, MdOutlinePassword, MdNumbers } from "react-icons/md";
import {
  buttonClick,
  fadeInOut,
  slideIn,
  slideTop,
  staggerFadeInOut,
} from "../animations";

// importing motion for animations :
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

// for firebase authentication :
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../config/firebase"


const Login = () => {
  // using usestate to get the values :
  const [userEmail, setuserEmail] = useState("");
  const [signUp, setsignUp] = useState(false);
  const [isPass, setisPass] = useState("");
  const [isConfirmedPass, setisConfirmedPass] = useState("");

  // defining the login function for google-auth login :
  const provider = new GoogleAuthProvider();

  const LoginGoogle = () =>{
    const auth = getAuth(app)
    signInWithPopup(auth, provider)
    .then((result) =>{
       auth.onAuthStateChanged((cred) =>{
         if(cred){
           cred.getIdToken().then((token)=>{
             console.log(token);
           })
         }
       })
    
    })
    .catch(err =>{
      const errorCode = err.code;
      const errorMessage = err.message;
      // The email of the user's account used.
      const email = err.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(err);
    })
  }

  return (
    <div className="w-screen h-screen relative  justify-center items-center  overflow-hidden flex ">
      {/* background image */}
      <img
        src={back3}
        alt="Login_Page"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      {/* login screen */}

      <div className="flex  flex-col w-560 items-center px-4 py-5 rounded-lg gap-6 bg-lightOverlay z-10 md:w-[50%] justify-center backdrop-blur-lg">
        <div className="flex w-full justify-start items-center gap-2 p-2">
          <img src={Logo} alt="Logo" className="w-6 h-7" />
          <p className="font-bold text-lg">TastyBites</p>
        </div>
        {/* welcome text */}

        <p className="font-bold text-xl">Welcome Back</p>

        {!signUp ? (
          <p className="-mt-6">Sign in Here!</p>
        ) : (
          <p className="-mt-6">Create Your Account</p>
        )}

        {/* input section */}

        <div className="w-full flex flex-col justify-center items-center gap-6 ">
          <LoginInput
            placeHolder={"Enter Email "}
            icon={<MdEmail className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            isSignUp={signUp}
            type={"email"}
          />
          <LoginInput
            placeHolder={"Enter Password"}
            icon={<MdOutlinePassword className="text-xl text-textColor" />}
            inputState={isPass}
            inputStateFunc={setisPass}
            isSignUp={signUp}
            type={"password"}
          />

          {signUp && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<MdOutlinePassword className="text-xl text-textColor" />}
              inputState={isConfirmedPass}
              inputStateFunc={setisConfirmedPass}
              isSignUp={signUp}
              type={"password"}
            />
          )}

          {!signUp ? (
            <p className="text-sm -mt-5 font-bold">
              Don't have an Account,  {"   "}
              <motion.button
                {...buttonClick}
                className="text-red-500 underline"
                onClick={() => setsignUp(true)}
              >
                Create Account
              </motion.button>{" "}
            </p>
          ) : (
            <p className="text-sm -mt-4 font-bold">
              Already have an Account ,{" "}
              <motion.button
                {...buttonClick}
                className="text-red-500 underline"
                onClick={() => setsignUp(false)}
              >
                Click here
              </motion.button>{" "}
            </p>
          )}
          {/* button section : */}

          {!signUp ? (
            <motion.button
              {...buttonClick}
              className="w-[80%] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-lg font-bold shadow-md backdrop-blur-md cursor-pointer text-lg "
            >
              Sign In
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-[80%] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-lg font-bold shadow-md backdrop-blur-md cursor-pointer text-lg "
            >
              Sign Up
            </motion.button>
          )}

        </div>

        <div className="flex items-center justify-between gap-14 py-2">
          <div className="w-24 h-[1px] bg-white"></div>
          <p className="text-white">Or</p>
          <div className="w-24 h-[1px] bg-white"></div>
        </div>
        
        {/* sign in with Google */}


        <motion.div onClick={LoginGoogle} {...buttonClick} className="flex px-[70px] md:w-[50%] py-2 gap-3 justify-center items-center rounded-2xl shadow-sm bg-lightOverlay backdrop-blur-md cursor-pointer">
                <FcGoogle className="text-2xl"/>
                <p className="font-bold">Google Sign In</p>
        </motion.div>
        
      </div>
    </div>
  )
}

export default Login;
