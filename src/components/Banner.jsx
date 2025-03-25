{/*//import React from 'react'
//import Banner from '../components/Banner';  // Adjust path as needed
//import Fisearch from "../components/Fisearch";
import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import React,{useState} from "react";



const Banner = () => {
    const [query,setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value)
        console.log(event.target.value)
    }
  return (
     <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
      
      <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
  Your Fitness<span className="text-black"> Journey</span> Starts Here!
</h1>
 
      <p className='text-lg text-black/70 mb-8'>Embrace Your Fitness Journey Now, Transform Your Body, and Elevate Your Life.</p>
      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-insert ring-gray-300 focus-within:ring-2 focus-within:ring-insert focus-within:ring-indigo-600 md:w-4/5 w-full'>
            <input type="text" none="title" id="title" placeholder='What type of plan are you looking for?' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'
            onChange={handleInputChange}
            value={query}
            />
            <FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>

          </div>
          <button type='submit' className="bg-black py-2 px-8 text-white md:rounded-5-none rounded">Search</button>
        </div>
      </form>
     </div>
  )
}

export default Banner */}
import { FiSearch } from "react-icons/fi";
import React from "react";

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
        Your Fitness<span className="text-black"> Journey</span> Starts Here!
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Embrace Your Fitness Journey Now, Transform Your Body, and Elevate Your Life.
      </p>
      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div className="relative flex md:rounded-s-md rounded shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 md:w-4/5 w-full">
            <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="What type of plan are you looking for?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              value={query}
            />
          </div>
          <button type="submit" className="bg-black py-2 px-8 text-white md:rounded-none rounded">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
