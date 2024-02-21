import React from "react";
import {
  FaGooglePlay,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";


const Footer2 = () => {
  return (
    <footer className="flex flex-col justify-center items-center text-gray-700 body-font py-4 w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600">
      
      <div className="w-full flex justify-around items-center">
        {/* 1st div */}

        <div className="flex flex-col">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-2xl bold mb-3">
            Connect With Us !
          </h2>
          <div className="flex justify-between items-center md:justify-start space-x-4 w-full gap-10">
            <a href="https://play.google.com/store/games?hl=en_IN&gl=US" target="_blank" className="text-gray-500 hover:text-gray-700">
              <FaGooglePlay className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/zeeshan_251" target="_blank" className="text-gray-500 hover:text-gray-700">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/?lang=en" target="_blank" className="text-gray-500 hover:text-gray-700">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" className="text-gray-500 hover:text-gray-700">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 2nd div */}

        <div className="flex flex-col ">
          <h2 className="title-font text-xl text-gray-900 tracking-widest mb-3">
            Service
          </h2>
          <div className="flex flex-col list-none mb-10 gap-2">
            <li>
              <a href="#" className="text-gray-700 hover:text-gray-950 cursor-pointer">Online Order</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">
                Pre-Reservation
              </a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">24/7 Services</a>
            </li>
          </div>
        </div>

        {/* 3rd div */}

        <div className="flex flex-col">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">
            Quick Links
          </h2>
          <div className="flex flex-col list-none mb-10 gap-2">
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Restaurants</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Feed back</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Blogs</a>
            </li>
          </div>
        </div>

        {/* 4th div */}

        <div className="flex flex-col">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">
            About
          </h2>
          <div className="flex flex-col list-none mb-10 gap-2">
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Our Story</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Benefits</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Careers</a>
            </li>
          </div>
        </div>

        {/* 5th div */}


        <div className="flex flex-col">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">
            Help
          </h2>
          <div className="flex flex-col list-none mb-10 gap-2">
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Contact</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">Support</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-gray-950 cursor-pointer">FAQ</a>
            </li>
          </div>
        </div>






      </div>

      <div>
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} TastyBites. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer2;
