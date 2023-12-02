import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashBoard, Login, Main } from "./conatiner";
import { useState, useEffect } from "react";
import { app } from "./config/firebase";
import { getAuth } from "firebase/auth";
import { validateToken } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import MainLoader from "./Components/MainLoader";
import Alert from "./Components/alert";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  //  using use effect for redux config :
  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateToken(token).then((data) => {
            console.log(data);
            dispatch(setUserDetails(data));
          });
        });
      }
    });

    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-100 inset-0 bg-lightOverlay backdrop-blur-lg flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dash-board/*" element={<DashBoard/>}/>
      </Routes>

      {/* <Alert type={"success"} message={"Logged in successfully"} /> */}
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
