import React from "react";
import { useState } from "react";
import { statuses } from "../utils/styles";
import MainLoader from "./MainLoader";
import SpinnerOk from "./SpinnerOk";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { buttonClick } from "../animations";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase";
import { useDispatch } from "react-redux";
import {
  alertDanger,
  alertNull,
  alertSuccess,
} from "../context/actions/alertActions";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import { addNewProduct } from "../api";

const DbAddNewItems = () => {
  const [itemName, setitemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  // function to upload image
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    //  console.log(ImageFile)
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image Uploaded to the cloud"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 2000);
        });
      }
    );
  };

  // function to delete image from firebase

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertDanger("Image Deleted from the cloud"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
    });
  };

  const submitNewData = () => {
    const data = {
      prod_name: itemName,
      prod_price: price,
      prod_category: category,
      prod_image: imageDownloadURL,
    };
    addNewProduct(data).then((res) => {
       console.log(res);
       dispatch(alertSuccess("Product Added Successfully"))
       setTimeout(() => {
        dispatch(alertNull());
        setPrice("")
        setImageDownloadURL(null)
        setitemName("")
        setCategory(null)
       }, 2000);
    })
    .catch(err => { 
      console.log(err)
    })
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-6 px-24">
      <div className=" border bg-gray-100 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder={"Item Name .... "}
          stateFunc={setitemName}
          stateValue={itemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-lg text-textColor font-semibold cursor-pointer hover:shadow-lg border backdrop-blur-md ${
                  data.category === category
                    ? "bg-orange-500 text-white"
                    : "bg-white"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        <InputValueField
          type="number"
          placeHolder={"Item Price .... "}
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className="w-full bg-white backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <SpinnerOk />

              {Math.round(progress > 0) && (
                <div className=" w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-orange-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <MdCloudUpload className="-rotate-0 " />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className=" w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className=" w-full h-full object-cover"
                    />

                    <motion.button
                      whileTap={{ scale: 1.15 }}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-9/12 py-2 rounded-md bg-orange-400 text-primary hover:bg-orange-500 cursor-pointer"
        >
          Save
        </motion.button>
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
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 "
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DbAddNewItems;
