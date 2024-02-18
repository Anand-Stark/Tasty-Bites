import React from "react";
import { useSelector } from "react-redux";
import { MdSearch } from "react-icons/md";
import { BsToggles2 } from "react-icons/bs";
import { motion } from "framer-motion";
import { Avatar } from "../assets";
import { buttonClick } from "../animations";
import { MdOutlineLogout } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserNULL } from "../context/actions/userActions";

// toastify : 
import { toast } from "react-toastify";

const DbHeader = () => {
   const user = useSelector((state) => state.user);

//   creating the signout functions for the user : 
// we have to use a dispacther and a navigator for states ;
   const dispacther = useDispatch();
   const navigator = useNavigate();
   const firebaseAuth = getAuth(app);

   const signOut = () =>{ 
        firebaseAuth.signOut().then(() => {        
          toast.error('Logged Out Successfully',{position:"top-right"})
            dispacther(setUserNULL())
            navigator("/Login")
        }).catch((error) => {
            console.log(error)
        });
   }

  return (
    <div className="flex w-full items-center justify-between gap-3 -mt-10 px-4">
      <p className="text-xl font-bold text-headingColor">
        {" "}
        Welcome To TastyBites
        {user?.name && (
          <span className="block text-base text-gray-500">{`  ${user?.name} 😊!`}</span>
        )}
      </p>

      <div className=" flex items-center justify-center gap-4">
        <div className=" flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>

        <motion.img
          whileTap={{ scale: 0.6 }}
          src={user ? user.picture : Avatar}
          className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
          alt="userprofile"
          referrerPolicy="no-referrer"
        />
        <motion.div
          {...buttonClick}
          onClick={signOut}
          className="group flex  items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
        >
          <RiLogoutCircleLine className="text-lg text-textColor group-hover::text-headingColor" />
          <p className="text-textColor text-lg group-hover:text-headingColor">
            Log Out
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DbHeader;
