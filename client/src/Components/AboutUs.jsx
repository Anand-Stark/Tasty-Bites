import React from 'react';
import { FaAlignJustify } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa6";
import { FaTruckFast } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { BiDollar } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { BsReddit } from "react-icons/bs";
import { GrProductHunt } from "react-icons/gr";

const AboutUs = () => {
  return (
<div className='flex'>
  <section class="  text-center text-black">
    <div class="mt-20 mx-auto">
       <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-orange-500 md:text-5xl lg:text-6xl dark:text-orange-500">Welcome to our culinary journey </h1>
        <p class="mb-8 text-lg font-normal text-gray-900 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-900">
                   which began with a shared passion for flavor and a 
                    commitment to bringing people together through delicious food. 
                    Our story is rooted in the love for culinary arts and the joy of 
                    creating memorable tasting experiences.
        </p>
    </div>

    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 text-black">
      <div class="max-w-screen-md mb-8 lg:mb-16 mx-auto my-auto">
          <h2 class="mb-4 text-4xl tracking-tight font-mediumbold text-gray-900 dark:text-black">Our Services</h2>
          <div class="flex mt-6 justify-center">
            <div class="w-16 h-1 rounded-full bg-orange-500 inline-flex"></div>
          </div>
      </div>
      <div class=" p-10 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div className='rounded-lg shadow-lg p-5'>
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-orange-500 mb-5 flex-shrink-0">
                <FaAlignJustify class=" text-2xl "/>
              </div>
              <div class="flex-grow">
                <h2 class="text-black text-lg title-font font-medium mb-3"> Effortless Ordering</h2>
                <p class="leading-relaxed text-base">Browse menus, explore new culinary adventures, and place orders effortlessly through our user-friendly platform.</p>
              </div>
          </div>
          <div className='rounded-lg shadow-lg p-5'>
            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-orange-500 mb-5 flex-shrink-0">
              <FaTruckFast class="text-3xl"/>
            </div>
            <div class="flex-grow">
             <h2 class="text-black text-lg title-font font-medium mb-3"> Dedicated Delivery Personnel</h2>
             <p class="leading-relaxed text-base">Say goodbye to long wait times. Our dedicated team of delivery professionals 
              ensures that your orders are delivered promptly to your doorstep.</p>
            </div>
          </div>
          <div  className='rounded-lg shadow-lg p-5'>
            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-orange-500 mb-5 flex-shrink-0">
              <FaStore class="text-3xl"/>
            </div>
            <div class="flex-grow">
              <h2 class="text-black text-lg title-font font-medium mb-3"> Restaurant Partnerships</h2>
              <p class="leading-relaxed text-base">Gain exposure to a broader audience by showcasing your restaurant on our platform.
                   Our user-friendly interface makes it simple for customers to discover and order from your menu.</p>
            </div>
          </div>
          <div  className='rounded-lg shadow-lg p-5'>
            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-orange-500 mb-5 flex-shrink-0">
              < FaUtensils class="text-3xl"/>
            </div>
            <div class="flex-grow">
              <h2 class="text-black text-lg title-font font-medium mb-3">Favourite Food Clicks Away</h2>
              <p class="leading-relaxed text-base">We've curated a selection of the finest restaurants in Your City to bring you a diverse and delightful dining experience.</p>
            </div>
          </div>
          <div  className='rounded-lg shadow-lg p-5'>
             <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-orange-500 mb-5 flex-shrink-0">
               < FaUser class="text-3xl"/>
             </div>
             <div class="flex-grow">
               <h2 class="text-black text-lg title-font font-medium mb-3"> Become a Delivery Partner</h2>
               <p class="leading-relaxed text-base">Join our team of delivery professionals 
                and be a part of our family. We're always on the lookout for reliable and
               enthusiastic individuals to ensure timely and efficient delivery services. 
               </p>
             </div>
          </div>
          <div  className='rounded-lg shadow-lg p-5'>
             <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-orange-500 mb-5 flex-shrink-0">
              <BiDollar class="text-3xl"/>
             </div>
             <div class="flex-grow">
               <h2 class="text-black text-lg title-font font-medium mb-3"> Secure and Convenient Transactions</h2>
               <p class="leading-relaxed text-base">Rest assured that your transactions are secure and hassle-free. 
                 We prioritize the safety and satisfaction of our customers, offering a range of payment options.</p>
             </div>
          </div>
      </div>
  </div>
  <div class="mb-20">
      <a href="#">
        <button class="px-10 py-3 mr-8 text-md text-black font-medium tracking-wide  capitalize transition-colors duration-300 transform bg-orange-500 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50">
         To explore more tastes
        </button>
      </a> 
      <a href="#">
        <button class="px-6 py-3 text-md text-black font-medium tracking-wide  capitalize transition-colors duration-300 transform bg-orange-500 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50">
          To register as delivery boy
        </button>
      </a>
  </div>
  <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <h2 class="mb-4 text-4xl tracking-tight font-mediumbold text-gray-900 dark:text-black">Featured In</h2>
          <div class="flex mt-6 justify-center">
            <div class="w-16 h-1 rounded-full bg-orange-500 inline-flex"></div>
          </div>
      <div class="flex flex-wrap justify-center items-center mt-8 mb-20 text-gray-500 sm:justify-between">
        <a href="#" class="mr-3 mb-5 lg:mb-0 hover:text-red-600 dark:hover:text-red-400">
            <FaYoutube class="text-3xl"/>                               
        </a>
        <a href="#" class="mr-3 mb-5 lg:mb-0 hover:text-blue-500 dark:hover:text-blue-500">
            <FaFacebook class="text-3xl"/>                             
        </a>
        <a href="#" class="mr-3 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-800">
            <FaXTwitter class="text-3xl"/>                                                            
        </a>
        <a href="#" class="mr-3 mb-5 lg:mb-0 hover:text-pink-500 dark:hover:text-pink-500">
            <FaSquareInstagram class="text-3xl"/>                                                           
        </a>
        <a href="#" class="mr-3 mb-5 lg:mb-0 hover:text-orange-500 dark:hover:text-orange-500">
            <BsReddit class="text-3xl"/>                                                          
        </a>
        <a href="#" class="mr-3 mb-5 lg:mb-0 hover:text-orange-500 dark:hover:text-orange-500">
             <GrProductHunt class="text-3xl"/>                                                          
        </a>         
      </div>
  </div>
</section>
    </div>
  );
}

export default AboutUs;
