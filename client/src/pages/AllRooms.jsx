import React, { useState, useMemo } from "react";
import { roomsDummyData, facilityIcons } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
  ];

  // ✅ Indian Thousands Pricing
  const priceRanges = [
    "1000 to 3000",
    "3000 to 6000",
    "6000 to 10000",
    "10000 to 20000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const handleTypeChange = (checked, label) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, label]);
    } else {
      setSelectedTypes(selectedTypes.filter((item) => item !== label));
    }
  };

  const handlePriceChange = (checked, label) => {
    if (checked) {
      setSelectedPrices([...selectedPrices, label]);
    } else {
      setSelectedPrices(selectedPrices.filter((item) => item !== label));
    }
  };

  const filteredRooms = useMemo(() => {
    let filtered = [...roomsDummyData];

    // ✅ Room Type Filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((room) =>
        selectedTypes.includes(room.roomType)
      );
    }

    // ✅ Price Filter (₹ thousands working properly)
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((room) =>
        selectedPrices.some((range) => {
          const cleanRange = range.replace("₹ ", "");
          const [min, max] = cleanRange.split(" to ").map(Number);
          return (
            room.pricePerNight >= min && room.pricePerNight <= max
          );
        })
      );
    }

    // ✅ Sorting
    if (sortBy === "Price Low to High") {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    }

    if (sortBy === "Price High to Low") {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    if (sortBy === "Newest First") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [selectedTypes, selectedPrices, sortBy]);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedPrices([]);
    setSortBy("");
  };

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24">
      <div className="flex gap-10">

        {/* LEFT SIDE ROOMS */}
        <div className="flex-1 flex flex-col gap-10">

          {filteredRooms.length === 0 && (
            <p className="text-gray-500">No rooms found.</p>
          )}

          {filteredRooms.map((room) => (
            <div key={room._id} className="flex gap-6 border-b pb-10">

              <img
                onClick={() => navigate(`/rooms/${room._id}`)}
                src={room.images?.[0]}
                alt=""
                className="w-[300px] h-[220px] rounded-xl object-cover cursor-pointer"
              />

              <div className="flex-1">
                <p className="text-gray-500">
                  {room.hotel?.city}
                </p>

                <p
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="text-3xl font-playfair cursor-pointer"
                >
                  {room.hotel?.name}
                </p>

                <div className="flex items-center">
                  <StarRating rating={room.rating || 4} />
                  <p className="ml-2">200+ reviews</p>
                </div>

                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      {facilityIcons?.[item] && (
                        <img
                          src={facilityIcons[item]}
                          alt={item}
                          className="w-5 h-5"
                        />
                      )}
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                {/* ✅ Indian Currency */}
                <p className="text-xl font-semibold text-gray-700">
                  ₹{room.pricePerNight} / night
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT FILTER */}
        <div className="w-80">
          <div className="border rounded-lg p-5">

            <div className="flex justify-between">
              <p className="font-medium">FILTERS</p>
              <span
                onClick={clearFilters}
                className="text-sm cursor-pointer text-blue-600"
              >
                CLEAR
              </span>
            </div>

            <p className="mt-4 font-medium">Room Type</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedTypes.includes(room)}
                onChange={handleTypeChange}
              />
            ))}

            <p className="mt-6 font-medium">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`₹ ${range}`}
                selected={selectedPrices.includes(`₹ ${range}`)}
                onChange={handlePriceChange}
              />
            ))}

            <p className="mt-6 font-medium">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={sortBy === option}
                onChange={setSortBy}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;