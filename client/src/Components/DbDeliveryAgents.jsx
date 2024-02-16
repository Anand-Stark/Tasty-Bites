import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserInfo, getUserTypes } from "../api";
import { Avatar } from "../assets";
import DbTable from "./DbTable";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase";

const DbDeliveryAgents = () => {
  const allusers = useSelector((state) => state.allUsers);
  const [filteredDeliveryIds, setFilteredDeliveryIds] = useState([]);

  useEffect(() => {
    const userIdSet = new Set(allusers?.map((user) => user?.uid));
    const userId = Array.from(userIdSet);
    const promises = []; // Array to store all promises

    userId.forEach((id) => {
      const promise = getUserTypes(id).then((res) => {
        const type = res._fieldsProto?.type.stringValue;
        if (type === "delivery") {
          return getUserInfo(id);
        }
      });
      promises.push(promise);
    });

    // Wait for all promises to resolve
    Promise.all(promises)
      .then((deliveryIds) => {
        const filteredIds = deliveryIds.filter(Boolean); // Remove undefined values
        setFilteredDeliveryIds(filteredIds); // Update state with filtered delivery IDs
      })
      .catch((error) => {
        console.error("Error fetching delivery user information:", error);
      });
  }, [allusers]);

  // Access filteredDeliveryIds here
  console.log(filteredDeliveryIds);

  return (
    <div className="flex items-center ml-32 justify-center gap-4 pt-6 w-[70%] ">
      <DbTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photo ? rowData.photo : Avatar}
                className="w-32 h-16 object-contain rounded-md"
                alt="no"
              />
            ),
          },
          {
            title: "Name",
            field: "name",
            render: (rowData) => {
              const displayName = rowData.name;
              const fallbackName = displayName
                ? displayName
                : rowData.email.substring(0, rowData.email.indexOf("@"));
              return <p>{displayName || fallbackName}</p>;
            },
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
        data={filteredDeliveryIds}
        title="Delivery Agents"
      />
    </div>
  );
};

export default DbDeliveryAgents;
