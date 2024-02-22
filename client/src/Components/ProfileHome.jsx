import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileInfo, postProfileInfo } from "../api";
import { setUserProfile } from "../context/actions/profileActions";
import { setReservation } from "../context/actions/reservationActions";
import { toast } from "react-toastify";

const ProfileHome = () => {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(
    profile?.phoneNumber?.stringValue
  );
  const [address, setAddress] = useState(profile?.address?.stringValue);
  const [numOrders, setNumOrders] = useState(10);
  // const [profilePhoto, setProfilePhoto] = useState("default-profile-photo.jpg");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      userName: userName,
      userEmail: userEmail,
      phoneNumber: phoneNumber,
      address: address,
    };

    if (user) {
      postProfileInfo(user.uid, data);
    }

    toast.success("Profile Updated Successfully", {
      position: "top-right",
      theme: "colored",
    });

    setSubmitted(true);
  };

  useEffect(() => {
    setLoading(true);
    getProfileInfo(user.uid).then((res) => {
      setResult(res);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (result) {
      dispatch(setUserProfile(result?._fieldsProto));
      setAddress(result?._fieldsProto?.address?.stringValue);
      setPhoneNumber(result?._fieldsProto?.phoneNumber?.stringValue);
    }
  }, [result]);

  return (
    <>
      {loading && <p>loading</p>}
      {!loading && (
        <div className="h-[95%] rounded-lg bg-gradient-to-bl from-orange-400 to-orange-600 flex py-14 items-center mt-2 justify-center">
          <div className="w-[80%] bg-white p-8 rounded-lg shadow-lg">
            <div className={`grid grid-cols-2 gap-4`}>
              <div>
                <h1 className="text-2xl font-semibold mb-4">
                  Complete Your Profile
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                      Username:
                    </label>
                    <input
                      required
                      type="text"
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email:
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">
                      Phone Number:
                    </label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">
                      Address:
                    </label>
                    <input
                      required
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {/* Profile photo upload section */}
                  {/* <div className="mb-4">
                    <label htmlFor="profilePhoto" className="block text-gray-700">
                      Profile Photo:
                    </label>
                    <input
                      type="file"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handleChangeProfilePhoto}
                      className="w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div> */}
                  <button
                    type="submit"
                    className=" bg-gradient-to-bl from-orange-400 to-orange-600 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              <div>
                <div>
                  <h1 className="text-2xl font-semibold mb-4">Your Details</h1>
                  <p>
                    <span className="font-semibold">Username:</span> {userName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {userEmail}
                  </p>
                  {submitted && (
                    <>
                      <p>
                        <span className="font-semibold">Phone Number:</span>{" "}
                        {phoneNumber}
                      </p>
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {address}
                      </p>
                    </>
                  )}
                </div>
                {/* Display profile photo */}
                <div className="mt-4">
                  <h1 className="text-2xl font-semibold mb-4">Profile Photo</h1>
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-40 h-40 object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHome;
