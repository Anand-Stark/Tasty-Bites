import React from "react";
import { Logo } from "../assets";
import { Avatar } from "../assets";
import { NavLink } from "react-router-dom";
import { buttonClick, fadeInOut } from "../animations";

// importing react icons :
import {
  MdOutlineShoppingCartCheckout,
  MdLogout,
  MdAddCircle,
  MdHome,
  MdMenuBook,
  MdPeople,
  MdDinnerDining,
  MdAdd
} from "react-icons/md";
// import { useStateValue } from "../context/StateProvider";
import { useState } from "react";

// importing firebase for authentication :
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase.config";

// for animation, importing motion from framer-motion :
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { actionType } from "../context/reducer";

const Header = () => {
  //   const firebaseAuth = getAuth(app);
  //   const provider = new GoogleAuthProvider();

  //   // using useContext to store all the user information  :
  //   const [{ user }, dispatch] = useStateValue();

  //   // using use state
  //   const [isMenu, setisMenu] = useState(false);

  //   // we have to store the sign-in information in the local database  :

  //   // creating a login
  //   const Login = () => {
  //     if (!user) {
  //       signInWithPopup(firebaseAuth, provider)
  //         .then((result) => {
  //           const {
  //             user: { refreshToken, providerData },
  //           } = result;
  //           dispatch({
  //             type: actionType.SET_USER,
  //             user: providerData[0],
  //           });
  //           localStorage.setItem("user", JSON.stringify(providerData[0]));
  //         })
  //         .catch((error) => {
  //           // Handle any errors here
  //         });
  //     } else {
  //       setisMenu(!isMenu);
  //     }
  //   };

  //   // creating a logout function for logging out a user :
  //   const LogOut = () => {
  //     setisMenu(false);
  //     localStorage.clear();

  //     //  now, we have to dispatch the user :
  //     dispatch({
  //       type: actionType.SET_USER,
  //       user: null,
  //     });
  //   };

  // selecting the user details :
  const user = useSelector((state) => state.user);

  return (
    <header className="fixed z-50 w-screen bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 p-3 px-5 md:p-2 md:px-4 ">
      {/* for dekstop and tablets */}
      <div className="hidden md:flex w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo"></img>
          <p className="text-headingColor text-xl font-bold">TastyBites</p>
        </Link>

        <div className="flex justify-center items-center ml-auto gap-4">
          <motion.ul
            initial={{ opacity: 0.1, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.1, x: 200 }}
            className="flex items-center gap-8"
          >
            <NavLink
              className="text-base font-semibold  text-textColor hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer"
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              whileTap={{ scale: 0.8 }}
              className="text-base font-semibold  text-textColor hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer"
              to={"/menu"}
            >
              Menu
            </NavLink>
            <NavLink
              whileTap={{ scale: 0.8 }}
              className="text-base font-semibold  text-textColor hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer"
              to={"/about"}
            >
              About Us
            </NavLink>
            <NavLink
              whileTap={{ scale: 0.8 }}
              className="text-base font-semibold  text-textColor hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer"
              to={"/service"}
            >
              Service
            </NavLink>
          </motion.ul>
          <motion.div
            whileTap={{ scale: 0.6 }}
            className="flex items-center justify-center px-2"
          >
            <MdOutlineShoppingCartCheckout className="cursor-pointer text-2xl text-textColor hover:text-headingColor ml-6" />
            <div className="relative -top-3 -left-2 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
              <p className="text-xs text-white font-semibold ">2</p>
            </div>
          </motion.div>
          <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.picture : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              // onClick={login}
            />

          {user ? (<></>) : (
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-1 rounded-sm shadow-md backdrop-blur-md bg-lightOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
                )}

          {/* <div className="relative " onClick={Login}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 h-10 drop-shadow-xl min-w-[40px] min-h-[40px] cursor-pointer rounded-full"
              src={user ? user.photoURL : Avatar}
              alt="Avatar Img"
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0.3, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.3, scale: 0.6 }}
                className="absolute bg-gray-100 shadow-xl rounded-md  flex flex-col right-0 top-11 w-36 "
              >
                {user && user.email === "starkyam31@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="flex text-textColor text-base transition-all ease-in-out px-4 py-2 flex-row gap-2 cursor-pointer hover:bg-stone-300 hover:rounded-md">
                      <MdAddCircle className="text-xl relative top-0" /> Add
                      Item
                    </p>
                  </Link>
                )}

                <p
                  onClick={LogOut}
                  className="flex hover:rounded-md text-textColor text-base transition-all ease-in-out px-4 py-2 flex-row gap-2 cursor-pointer hover:bg-stone-200"
                >
                  <MdLogout className="relative top-1" /> Logout
                </p>
              </motion.div>
            )} */}
        </div>
      </div>

      {/* for mobiles would be made later if time persists*/}
    </header>
  );
};

export default Header;
