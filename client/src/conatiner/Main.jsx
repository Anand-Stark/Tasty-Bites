import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts,getPremiumUsers } from "../api";
import {
  Cart,
  DeliveryMapSlider,
  DeliveryOrder,
  FilterSection,
  Header,
  Home,
  HomeSLider,
  MapView,
} from "../Components";
import { setAllProducts } from "../context/actions/productActions";
import { setPremium } from "../context/actions/premiumUserActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer2 from "../Components/Footer2";
import { getUserTypes } from "../api";
import { setUserType } from "../context/actions/userTypeActions";
import Image from "../assets/img/image.png";
import { designer } from "../assets";
import axios from "axios";
import {toast }from "react-toastify"
import { baseUrl } from "../api";


const Main = () => {

  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const userType = useSelector((state) => state.userType);
  const user = useSelector((state) => state.user);
  const premium = useSelector((state) => state.premium)
  const dispatch = useDispatch();
  


  const checkoutPremium = () => { 
    toast.info('Premium Membership Checkout',{position:"top-right"})

    const data = {
        user : user,
        paymentType: "premium"
    }

    axios.post(`${baseUrl}/api/products/create-checkout-seesion-premium`, {data})
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  useEffect(() => { 
     if(user){
       getPremiumUsers()
       .then((res) => {
          // console.log(res);
          const userId = user.user_id;

          console.log(userId);

          getPremiumUsers()
          .then(allUsers => { 
            const userExists = allUsers.some(obj => obj.userId === userId);
            dispatch(setPremium(userExists))
          })

       })
     }
  }, [user]);

  

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
          <div className="w-full flex flex-col items-start justify-center mt-32 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
            <Home />
            <HomeSLider />
          </div>
          <DeliveryOrder />
          <div className="w-full flex flex-col items-start justify-center mt-5 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
            <DeliveryMapSlider />
            <MapView />
          </div>
          <Footer2/>
        </main>
      ) : (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
          <Header />
          <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
            <Home />
            <HomeSLider />
            <FilterSection />
         
          </div>

          <div className=" w-full px-24 flex items-center justify-between ">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-2xl text-headingColor font-bold">
                Reservations
              </p>
              <div className="w-48 h-1 rounded-md bg-orange-500"></div>
            </div>
          </div>


          <div className="w-full flex justify-around items-center mb-8">
            <div className="w-1/2 flex flex-col flex-wrap justify-center items-center gap-8">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Looking to Book a Table?
              </h1>

              <p className="text-lg text-center text-gray-700">
                Experience exquisite dining with us. Whether it's a romantic
                dinner for two or a gathering with friends and family, we're
                here to make your dining experience unforgettable. Reserve your
                table now and indulge in culinary delights prepared by our
                talented chefs.
              </p>
              <Link
                to="/reservation"
                className="block w-full max-w-xs mx-auto bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold text-center hover:from-orange-400 hover:to-orange-600 hover:bg-gradient-to-tl hover:scale-105 transition ease-in-out"
              >
                Reserve Here
              </Link>
            </div>
            <img
              src={Image}
              alt="Reservation"
              className="aspect-square w-1/4"
            />
          </div>

          <div className=" w-full px-24 flex items-center justify-between ">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-2xl text-headingColor font-bold">
                Gold Membership
              </p>
              <div className="w-64 h-1 rounded-md bg-orange-500"></div>
            </div>
          </div>

          <div className="w-full flex justify-around items-center mb-8 py-6">
          <img
              src={designer}
              alt="Reservation"
              className="aspect-square w-1/4"
            />
            <div className="w-1/2 flex flex-col flex-wrap justify-center items-center gap-8">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                 Buy our Membership !
              </h1>

              <p className="text-lg text-center text-gray-700">
              Unlock exclusive discounts with our premium membership! Enjoy extra savings on all your food orders as a valued member. Elevate your dining experience and indulge in delicious meals while keeping more money in your pocket. Join now to start enjoying the benefits of our premium membership!
              </p>
              <Link
                onClick={checkoutPremium}
                className="block w-full max-w-xs mx-auto bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold text-center hover:from-orange-400 hover:to-orange-600 hover:bg-gradient-to-tl hover:scale-105 transition ease-in-out"
              >
                Buy Premium
              </Link>
            </div>
            
          </div>

          <Footer2 />
          {isCart && <Cart />}
        </main>
      )}
    </>
  );
};

export default Main;
