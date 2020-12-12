/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./About.scss";

class HomePage extends Component {
  render() {
    return (
      <div id='page-about' className='background_image' style= {{height:"100vh"}}>
        <div className="flex bg-white" style= {{height:"100vh"}}>
          <div className='flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2'>
            <div>
              <h2 className='text-3xl font-semibold text-gray-800 md:text-4xl'>
                Share your food <span class='text-indigo-600'>HERE</span>
              </h2>
              <p className='mt-2 text-sm text-gray-500 md:text-base'>Welcome to <span class='text-indigo-600'>FOOD SHARE MRKTPLC, </span>where we provide a platform for users to share food products with their neighbours. Simply sign up and start sharing your food with others.</p>
              <div className='flex justify-center lg:justify-start mt-6'></div>
            </div>
          </div>
          <div className='hidden lg:block lg:w-1/2' style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
            <div className='h-full background_image' style={{ backgroundImage: "url(/img/foodpic5.jpg)" }}>
              <div className='h-full bg-white bg-black opacity-25'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
