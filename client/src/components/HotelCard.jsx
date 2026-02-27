import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room }) => {
  const navigate = useNavigate();
  if (!room) return null;

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer" onClick={() => navigate(`/rooms/${room._id}`)}>
      <div className="relative">
        <img
          src={room.images && room.images[0] ? room.images[0] : assets.defaultRoomImage}
          alt="room"
          className="w-full h-60 object-cover"
        />
        {room.isBestSeller && (
          <span className="absolute top-4 left-4 bg-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between w-full p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{room.hotel?.name || "Hotel Name"}</h3>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            <span className="text-sm text-gray-600">{room.rating || 4.5}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel?.address || "Address"}</span>
        </div>

        <div className="flex justify-between items-center pt-3">
          <p className="text-lg font-semibold text-gray-900">
            ${room.pricePerNight || 100}
            <span className="text-sm text-gray-500"> /night</span>
          </p>
          <button
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/rooms/${room._id}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;