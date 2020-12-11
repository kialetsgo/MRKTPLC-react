/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import { HashLink as HLink } from 'react-router-hash-link';
import "./../pages/Home.scss";

class Home extends React.Component {


  isAuthenticated() {
    console.log(this.props.cookies)
    const token = this.props.cookies.get('token')

    if (!token || token === "undefined" || token === "null") {
      return false
    }

    return true
  }
  render() {
    return (
      <div id='page-home' className='background_image hidden lg:block' style={{ backgroundImage: "url(/img/foodpic3.jpg)" }}>
        <div className='h-screen bg-opacity-50 bg-black flex items-center justify-center'>
          <div className='mx-2 text-center'>
            <h1 className='text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl'>
              <span className='text-white'>The BEST</span> Place To
            </h1>
            <h2 className='text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight'>
              Share Food With <span className='text-white'>Friends</span> And <span className='text-white'>Strangers</span>
            </h2>
            <div className='inline-flex'>
              {
                this.isAuthenticated() ? (
                  <button className='p-2 my-5 mx-2 bg-indigo-700 hover:bg-indigo-800 font-bold text-white rounded border-2 border-transparent hover:border-indigo-800 shadow-md transition duration-500 md:text-xl'>
                    <a href='/users/register'>Sign Up</a></button>) : ""
              }
              <button className='p-2 my-5 mx-2 bg-transparent border-2 bg-indigo-200 bg-opacity-75 hover:bg-opacity-100 border-indigo-700 rounded hover:border-indigo-800 font-bold text-white shadow-md transition duration-500 md:text-lg'>
                <HLink to="/about#page-about">Learn More</HLink></button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withCookies(Home)
