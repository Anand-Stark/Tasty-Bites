import { motion } from "framer-motion";
import React from "react";
import { Slider } from "../Components";
import { useSelector } from "react-redux";

const HomeSLider = () => {
  const userType = useSelector((state) => state.userType);

  return (
    <>
      {userType === "user" || !userType ? (
        <motion.div className="w-full flex items-start justify-start flex-col">
          <div className=" w-full flex items-center justify-between ">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-2xl text-headingColor font-bold">
                Our Fresh & Healthy Fruits
              </p>
              <div className="w-80 h-1 rounded-md bg-orange-500"></div>
            </div>
          </div>

          <Slider />
        </motion.div>
      ) : (
        <motion.div className="w-full flex items-start justify-start flex-col">
          <div className=" w-full flex items-center justify-between ">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-2xl text-headingColor font-bold">
                Orders 
              </p>
              <div className="w-28 h-1 rounded-md bg-orange-500"></div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HomeSLider;
