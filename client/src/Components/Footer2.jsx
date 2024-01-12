import React from 'react';
import { FaLocationDot, FaCircleDollarToSlot, FaBowlFood, FaApple, FaGooglePlay } from 'react-icons/fa6';
import { FaCheckCircle, FaShoppingCart, FaStar, FaUserCircle } from 'react-icons/fa';

const Footer2 = () => {
  return (
    <footer className=" text-gray-600 body-font py-4 w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600">
      <div className="container px-10  mx-auto flex flex-wrap flex-col md:flex-row ">
        <div className="flex-shrink-0 w-full md:w-64 text-center md:text-left mb-6 md:mb-0">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-2xl mb-3">
            Connect With Us!
          </h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaLocationDot className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaCircleDollarToSlot className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaBowlFood className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaApple className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center ">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-center mb-8 md:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">Service</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-900">Online Order</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Pre-Reservation</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">24/7 Services</a>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-center mb-8 md:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">Quick Links</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-900">Restaurants</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Feed back</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Blogs</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Order Foods</a>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-center mb-8 md:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">About</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-900">Our Story</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Benefits</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Careers</a>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-center">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-1xl mb-3">Help</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-900">Contact</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Support</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">FAQ</a>
              </li>
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} TastyBites. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer2;
