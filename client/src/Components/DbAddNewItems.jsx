import React from "react";
import { useState } from "react";

const DbAddNewItems = () => {
  const [itemName, setitemName] = useState("")
  return (
    <div className="flex flex-col items-center justify-center w-full pt-6 px-24">
      <div className=" border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
      <InputValueField
          type="text"
          placeHolder={"Item Name .... "}
          stateFunc={setitemName}
          stateValue={itemName}
        />
      </div> 
    </div> 
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DbAddNewItems;
