import React from "react";
import { DbLeftSection, DbRightSection, ProfileLeftSection, ProfileRightSection } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { getProfileInfo } from "../api";
// import { useDispatch } from "react-redux";
import { setUserProfile } from "../context/actions/profileActions";

const ProfileDash = () => {
  //   const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch();


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
