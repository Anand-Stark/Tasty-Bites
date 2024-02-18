import React from "react";
import { Logo } from "../assets";
import { Avatar } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { buttonClick, fadeInOut, slideTop } from "../animations";
import { app } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { setCartOn } from "../context/actions/displayCartAction";

// importing react icons :
import {
  MdOutlineShoppingCartCheckout,
  MdLogout,
  MdAddCircle,
  MdHome,
  MdMenuBook,
  MdPeople,
  MdDinnerDining,
  MdAdd,
} from "react-icons/md";
// import { useStateValue } from "../context/StateProvider";
import { useState } from "react";
import { toast } from "react-toastify";

// importing firebase for authentication :
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase.config";

// for animation, importing motion from framer-motion :
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserNULL } from "../context/actions/userActions";
import ComboBox from "./ComboBox";
import {
  setUserType,
  setUserTypeNull,
} from "../context/actions/userTypeActions";
// import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);

  //   // using use state
  const [isMenu, setIsMenu] = useState(false);

  // for user navigation :
  const navigate = useNavigate();

  // for dispatching the action
  const dispatch = useDispatch();

  // selecting the user details :
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const userType = useSelector((state) => state.userType);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        toast.success('Signed Out Successfully',{position:"top-right"})
        dispatch(setUserNULL());
        dispatch(setUserTypeNull());
        navigate("/Login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="fixed z-50 w-screen bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 p-3 px-5 md:p-2 md:px-4 ">
      {/* for dekstop and tablets */}
      <div className="hidden md:flex w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo"></img>
          <p className="text-headingColor text-xl font-bold">TastyBites</p>
        </Link>

        {userType === "user" && <ComboBox />}

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
            {userType === "user" &&  <NavLink
              whileTap={{ scale: 0.8 }}
              className="text-base font-semibold  text-textColor hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer"
              to={"/reservation"}
            >
              Reservation 
            </NavLink>}
           
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
              to={"/contact"}
            >
              Contact Us
            </NavLink>
          </motion.ul>

          {userType === "user" && (
            <motion.div
              whileTap={{ scale: 0.6 }}
              className="flex items-center justify-center px-2"
            >
              <MdOutlineShoppingCartCheckout
                onMouseEnter={() => dispatch(setCartOn())}
                className="cursor-pointer text-2xl text-textColor hover:text-headingColor ml-6"
              />
              {cart?.length && (
                <div className="relative -top-3 -left-2 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <p className="text-xs text-white font-semibold ">
                    {cart?.length}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {user ? (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => setIsMenu(true)}
              >
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  src={user ? user.picture : Avatar}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                  alt="userprofile"
                  referrerPolicy="no-referrer"
                />

                {isMenu && (
                  <motion.div
                    {...slideTop}
                    onMouseLeave={() => setIsMenu(false)}
                    className="px-6 py-4 w-44 font-semibold bg-neutral-50 rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                  >
                    {user?.user_id === "ZP2jBsegSPfOVGvFTveQlVQhuWT2" && (
                      <Link
                        className=" hover:text-red-500 text-xl text-textColor"
                        to={"/dash-board/home"}
                      >
                        Dashboard
                      </Link>
                    )}

                    {/* <Link
                      className=" hover:text-red-500 text-lg text-textColor"
                      to={"/profile"}
                    >
                      My Profile
                    </Link> */}
                    <Link
                      className=" hover:text-red-500 text-lg text-textColor"
                      to={"/user-orders"}
                    >
                      Orders
                    </Link>
                    <hr />

                    <motion.div
                      {...buttonClick}
                      onClick={signOut}
                      className="group flex  items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                    >
                      <MdLogout className="text-lg text-textColor group-hover::text-headingColor" />
                      <p className="text-textColor text-lg group-hover:text-headingColor">
                        Log Out
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <>
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                alt="userprofile"
                referrerPolicy="no-referrer"
              />

              <NavLink to={"/login"}>
                <motion.button
                  {...buttonClick}
                  className="px-4 py-1 rounded-sm shadow-md backdrop-blur-md bg-lightOverlay border border-red-300 cursor-pointer"
                >
                  Login
                </motion.button>
              </NavLink>
            </>
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
