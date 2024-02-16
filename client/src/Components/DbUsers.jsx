import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { Avatar } from "../assets";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import DbTable from "./DbTable";

const DBUsers = () => {

  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)


 

  return (
    <div className="flex items-center ml-32 justify-center gap-4 pt-6 w-[70%] ">
      <DbTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : Avatar}
                className="w-32 h-16 object-contain rounded-md"
                alt="no"
              />
            ),
          },
          {
            title: "Name",
  field: "displayName",
  render: (rowData) => {
    const displayName = rowData.displayName;
    const fallbackName = displayName ? displayName : rowData.email.substring(0, rowData.email.indexOf('@'));
    return <p>{displayName || fallbackName}</p>;
  }
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={allUsers} 
        title="List of Users"
      />
    </div>
  );
};

export default DBUsers;
