import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, DeliveryMapSlider, DeliveryOrder, FilterSection, Header, Home, HomeSLider, MapView } from "../Components";
import { setAllProducts } from "../context/actions/productActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer2 from "../Components/Footer2";
import { getUserTypes } from "../api";
import { setUserType } from "../context/actions/userTypeActions";

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const userType = useSelector((state) => state.userType);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  useEffect(() => {
    if (!userType && user) {
      console.log("Setting the user type");

      const userId = user.user_id;

      getUserTypes(userId).then((res) => {
        const type = res._fieldsProto.type.stringValue;
        dispatch(setUserType(type));
      });
    }
  }, [user]);

  return (
    <>
      {userType === "delivery" ? (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
            <Header />
             <div className="w-full flex flex-col items-start justify-center mt-32 px-6 md:px-24 2xl:px-96 gap-12 pb-24" >
               <Home/>
               <HomeSLider/>
             </div>
             <DeliveryOrder/>
             <div className="w-full flex flex-col items-start justify-center mt-5 px-6 md:px-24 2xl:px-96 gap-12 pb-24" >
               <DeliveryMapSlider/>
               <MapView/>
               
             </div>
          </main>
      ) : (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
          <Header />
          <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
            <Home />
            <HomeSLider />
            <FilterSection />
          </div>
          <Footer2 />
          {isCart && <Cart />}
        </main>
        
      )}
    </>
  );
};

export default Main;
