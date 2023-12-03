import React from "react";
import { useState } from "react";
import { statuses } from "../utils/styles";
import MainLoader from "./MainLoader";
import SpinnerOk from "./SpinnerOk";
import { MdCloudUpload } from "react-icons/md";
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { useDispatch } from "react-redux";
import { alertDanger,alertNull,alertSuccess } from "../context/actions/alertActions";
import { useSelector } from "react-redux";


const DbAddNewItems = () => {
  const [itemName, setitemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
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
          }, 3000);
        });
      }
    );
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
                className={`px-4 py-3 rounded-md text-lg text-textColor font-semibold cursor-pointer hover:shadow-lg border bg-white backdrop-blur-md ${
                  data.category === category
                    ? "bg-orange-500 text-white"
                    : "bg-transparent"
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
                <></>
              )}
            </>
          )}
        </div>
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
