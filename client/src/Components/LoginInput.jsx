import React, { useState } from "react";
import {motion} from "framer-motion"
import { fadeInOut,buttonClick,slideIn,slideTop } from "../animations";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  // defining the ChangedState function :

  const ChangedState = (e) => {
    inputStateFunc(e.target.value);
  };
  // defining a state for focus change :
  const [isFocus, setisFocus] = useState(false);

  return (
    <motion.div {...slideIn}
      className={
        `flex flex-row items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-lg w-[80%] px-4 py-2 ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"} `
      }
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent border-none outline-none text-base font-bold "
        value={inputState}
        onChange={ChangedState}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
