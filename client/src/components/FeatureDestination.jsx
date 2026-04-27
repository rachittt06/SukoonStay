import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeatureDestination = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get("/api/rooms");
        if (data?.success) setRooms(data.rooms || []);
      } catch {
        // keep silent on homepage
      }
    };
    fetchRooms();
  }, [axios]);

  return (
    <div className="px-6 md:px-16 lg:px-24 bg-slate-50 py-20">

      <Title
        title="Featured Destinations"
        subTitle="Discover our handpicked selection of exceptional stays across India, offering premium comfort, modern amenities, and unforgettable experiences."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
        {rooms.slice(0, 4).map((room) => (
          <HotelCard key={room._id} room={room} />
        ))}
      </div>

      {/* CENTER BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-6 py-3 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
          View All Rooms
        </button>
      </div>

    </div>
  );
};

export default FeatureDestination;