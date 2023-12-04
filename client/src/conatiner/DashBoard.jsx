import React from "react";
import { DbLeftSection, DbRightSection } from "../Components";

const DashBoard = () => {
  return <div className="w-screen h-screen flex items-center bg-white">
     
     <DbLeftSection/>
     <DbRightSection/>
  </div>;
};

export default DashBoard;
