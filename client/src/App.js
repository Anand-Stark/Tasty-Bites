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
import { CheckOutSuccess, Header } from "./Components";
import Menu from "./Components/Menu";
import AboutUsPage from "./Components/AboutUs";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Cities from "./Components/Cities";
import Footer2 from "./Components/Footer2";
import About from "./conatiner/About";
import Contacts from "./conatiner/Contacts";


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const products = useSelector((state) => state.products);

  

  //  using use effect for redux config :
  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateToken(token).then((data) => {
            // console.log(data);
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
    <div className=" w-screen min-h-screen h-auto flex flex-col items-center justify-center">
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
        <Route path="/checkout-success" element={<CheckOutSuccess/>} />
        {/* <Route path="/menu" element={<Menu items = {products}/>} /> */}
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contacts/>} />
        

        
      </Routes>
       
       {/* <Cities/> */}
        {/* <Footer2/> */}
            {/* <Alert type={"success"} message={"Logged in successfully"} /> */}
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
