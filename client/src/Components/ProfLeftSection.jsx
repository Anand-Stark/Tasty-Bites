import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";


const ProfLeftSection = () => {
  return (
    <div className=" h-full font-bold flex flex-col bg-lightOverlay backdrop-blur-md shadow-lg min-w-210 w-300 ">
      <NavLink
        to={"/"}
        className="flex bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600  items-center justify-start px-2 gap-3 py-3 shadow-lg"
      >
        <img src={Logo} className="w-8" alt="" />
        <p className="font-semibold text-xl ">TastyBites</p>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4 first-letter ">
        <NavLink
          to={"/user-profile/"}
      className={({ isActive }) =>
            isActive
              ? `${isActiveStyles}  px-4 py-2  border-l-4  border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/user-profile/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-4  border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink> 
        <NavLink
          to={"/user-profile/reservation-list"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-4  border-red-500`
              : isNotActiveStyles
          }
        >
        Your Reservations
        </NavLink>
      </ul>
      {/* help center card here : - > */}
       
      <div className="w-full text-sm items-center justify-center flex h-225 mt-auto px-2 py-3 mb-1 shadow-lg">
        <div className="w-full h-full rounded-md bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600  flex items-center justify-center flex-col gap-3 px-3 py-3">
        <hr/>
          <div className="w-12 h-12 borde bg-white rounded-full flex items-center justify-center">
            <p className="text-xl font-bold text-red-500">?</p>
          </div>
          <p className="text-lg text-primary font-semibold">Help Center</p>
          <p className="text-base text-primary text-center">
            Having trouble in city. Please contact us for more questions
          </p>
          <p className="px-4 py-2 w-40 text-center rounded-full bg-primary text-red-400 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProfLeftSection;
