import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";

const FeatureDestination = () => {
  return (
    <div className="w-full px-6 py-12">

      <h2 className="text-2xl font-semibold mb-8">
        Featured Destinations
      </h2>

      {/* FULL WIDTH VERTICAL LIST */}
      <div className="w-full flex flex-col gap-8">
        {roomsDummyData.map((room) => (
          <HotelCard key={room._id} room={room} />
        ))}
      </div>

    </div>
  );
};

export default FeatureDestination;
