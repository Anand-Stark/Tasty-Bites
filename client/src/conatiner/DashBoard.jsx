import React from "react";
import { DbLeftSection, DbRightSection } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";

const DashBoard = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        // console.log(data);
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center bg-white">
      {allUsers && (
        <>
          <DbLeftSection />
          <DbRightSection />
        </>
      )}
    </div>
  );
};

export default DashBoard;
