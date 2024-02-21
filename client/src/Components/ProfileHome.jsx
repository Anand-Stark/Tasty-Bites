// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const ProfileHome = () => {
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [numOrders, setNumOrders] = useState(10);
//   const [profilePhoto, setProfilePhoto] = useState("default-profile-photo.jpg");
//   const [submitted, setSubmitted] = useState(false);

//   const handleChangeProfilePhoto = () => {
//     setProfilePhoto("new-profile-photo.jpg");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logic to handle form submission
//     setSubmitted(true);
//   };

//   const user = useSelector((state) => state.user);

//   return (
//     <>
//       {user && (
//         <div className="h-[90%] rounded-lg bg-gradient-to-bl from-orange-400 to-orange-600 flex py-14 items-center mt-10 justify-center">
//           <div className="w-[80%] bg-white p-8 rounded-lg shadow-lg">
//             <div className={`grid grid-cols-${setSubmitted ? 2 : 1} gap-4`}>
//               <div>
//                 <h1 className="text-2xl font-semibold mb-4">
//                   Complete Your Profile
//                 </h1>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label htmlFor="username" className="block text-gray-700">
//                       Username:
//                     </label>
//                     <input
//                       required
//                       type="text"
//                       id="username"
//                       value={user.name}
//                       onChange={(e) => setUserName(e.target.value)}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="email" className="block text-gray-700">
//                       Email:
//                     </label>
//                     <input
//                       required
//                       type="email"
//                       id="email"
//                       value={user.email}
//                       onChange={(e) => setUserEmail(e.target.value)}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="phone" className="block text-gray-700">
//                       Phone Number:
//                     </label>
//                     <input
//                       required
//                       type="tel"
//                       id="phone"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="address" className="block text-gray-700">
//                       Address:
//                     </label>
//                     <input
//                       required
//                       type="text"
//                       id="address"
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   {/* <div className="mb-4">
//               <label htmlFor="country" className="block text-gray-700">Country:</label>
//               <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//             </div> */}
//                   <button
//                     type="submit"
//                     className=" bg-gradient-to-bl from-orange-400 to-orange-600 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                   >
//                     Update Profile
//                   </button>
//                 </form>
//               </div>

//               <div>
//                 <div>
//                   <h1 className="text-2xl font-semibold mb-4">Your Details</h1>
//                   <p>
//                     <span className="font-semibold">Username:</span> {user.name}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Email:</span> {user.email}
//                   </p>
//                   {submitted && (
//                     <>
//                       <p>
//                         <span className="font-semibold">Phone Number:</span>{" "}
//                         {phoneNumber}
//                       </p>
//                       <p>
//                         <span className="font-semibold">Address:</span>{" "}
//                         {address}
//                       </p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileHome;

import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfileHome = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [numOrders, setNumOrders] = useState(10);
  const [profilePhoto, setProfilePhoto] = useState("default-profile-photo.jpg");
  const [submitted, setSubmitted] = useState(false);

  const handleChangeProfilePhoto = (e) => {
    // Logic to handle profile photo upload
    const file = e.target.files[0];
    // Assuming a function to upload the photo and get its URL
    uploadProfilePhoto(file);
  };

  const uploadProfilePhoto = (file) => {
    // Simulate photo upload and get the URL
    const photoURL = URL.createObjectURL(file);
    setProfilePhoto(photoURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    setSubmitted(true);
  };

  const user = useSelector((state) => state.user);

  return (
    <>
      {user && (
        <div className="h-full rounded-lg bg-gradient-to-bl from-orange-400 to-orange-600 flex py-14 items-center mt-10 justify-center">
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
                      value={user.name}
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
                      value={user.email}
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
                  <div className="mb-4">
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
                  </div>
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
                    <span className="font-semibold">Username:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
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
