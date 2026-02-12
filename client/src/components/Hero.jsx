import React from "react";
import { assets } from "../assets/assets"; // ✅ import assets

const cities = ["Delhi", "Mumbai", "Goa", "Jaipur", "Bangalore"]; // ✅ define cities

const Hero = () => {
  return (
    <div
      className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'
    >
      <p className='bg-[#49B9FF]/50 text-sm px-4 py-1 rounded-full mt-20'>
        The Ultimate Hotel Experience
      </p>

      <h1 className='font-playfair text-3xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Discover Your Perfect Getaway Destination
      </h1>

      <p className='max-w-xl mt-3 text-sm md:text-base text-white/90'>
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts.
        Start your journey today.
      </p>

      <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row gap-4 mt-6 max-md:w-full'>

        {/* Destination */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.locationIcon} alt="" className='h-4' />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            list='destinations'
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />

          <datalist id='destinations'>
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check in */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Check out */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div className='flex flex-col'>
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            defaultValue={1}
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          className='flex items-center justify-center gap-2 rounded-md bg-black py-3 px-4 text-white mt-auto cursor-pointer max-md:w-full'
        >
          <img src={assets.searchIcon} alt="search" className='h-5' />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
