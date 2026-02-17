import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room }) => {
  return (
    <Link
      to={"/rooms/" + room?._id}
      className="block w-full"
    >
      <div className="flex w-full bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden">

        {/* IMAGE LEFT */}
        <div className="w-64 h-64 flex-shrink-0">
          <img
            src={room?.images?.[0]}
            alt="room"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT RIGHT */}
        <div className="flex flex-col justify-between w-full p-6">

          {/* TOP ROW */}
          <div className="flex justify-between w-full">
            <h3 className="text-2xl font-semibold text-gray-800">
              {room?.hotel?.name}
            </h3>

            <div className="flex items-center gap-1">
              <img
                src={assets.starIconFilled}
                alt="star"
                className="w-5 h-5"
              />
              <span className="text-base font-medium text-gray-700">
                4.5
              </span>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-2 text-gray-500">
            <img
              src={assets.locationIcon}
              alt="location"
              className="w-4 h-4"
            />
            <span>{room?.hotel?.address}</span>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-semibold text-gray-900">
              ${room?.pricePerNight}
              <span className="text-sm text-gray-500"> /night</span>
            </p>

            <button className="px-8 py-3 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
