import React from "react";
import { DbLeftSection, DbRightSection, ProfileLeftSection, ProfileRightSection } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";


const ProfileDash = () => {
  //   const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="w-screen h-screen flex items-center bg-white">
      {user && (
        <>
          <ProfileLeftSection/>
          <ProfileRightSection/>
        </>
      )}
    </div>
  );
};

export default ProfileDash;
