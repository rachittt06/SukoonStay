import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const { axios, getToken } = useAppContext();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/rooms/${id}`);
        if (data?.success) {
          setRoom(data.room);
          setMainImage(data.room?.images?.[0] || null);
        } else {
          toast.error(data?.message || "Room not found");
        }
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const today = new Date().toISOString().split("T")[0];

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate: checkIn,
        checkOutDate: checkOut
      });
      if (data?.success) {
        if (data.isAvailable) toast.success("Room is available");
        else toast.error("Room is not available");
        return data.isAvailable;
      }
      toast.error(data?.message || "Failed to check availability");
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
    return false;
  };

  const bookRoom = async () => {
    if (!user) return;
    const available = await checkAvailability();
    if (!available) return;
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/bookings/book",
        { room: id, checkInDate: checkIn, checkOutDate: checkOut, guests },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data?.success) toast.success(data.message || "Booking created");
      else toast.error(data?.message || "Failed to book");
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading...</div>;
  if (!room)
    return <div className="pt-40 text-center">Room not found</div>;

  const facilityIcons = {
    "Free WiFi": assets.wifiIcon,
    "Free Wifi": assets.wifiIcon,
    "Free Breakfast": assets.breakfastIcon,
    Breakfast: assets.breakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainViewIcon || assets.mountainIcon,
    "Pool Access": assets.poolIcon,
    "Air Conditioning": assets.acIcon,
    TV: assets.tvIcon,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkAvailability();
  };

  return (
    <div className="py-28 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Room Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name}
          <span className="font-inter text-sm"> ({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center mt-3">
        <StarRating rating={room.rating} />
        <p className="ml-2">200+ reviews</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel?.address}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="Room"
            className="w-full h-[400px] rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images?.map((image, index) => (
            <img
              key={index}
              onClick={() => setMainImage(image)}
              src={image}
              alt="Room"
              className={`w-full h-40 rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image
                  ? "outline outline-2 outline-orange-500"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Amenities + Price */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-playfair">
            Experience Luxury Like Never Before
          </h2>

          <div className="flex flex-wrap items-center mt-4 gap-4">
            {room.amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
              >
                {facilityIcons[item] && (
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
        </div>

        <p className="text-2xl font-semibold text-gray-800">
          ₹{room.pricePerNight} / night
        </p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-6 rounded-2xl mx-auto mt-16 max-w-6xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

            <div className="flex flex-col">
              <label className="font-medium text-sm">Check-In</label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="rounded border border-gray-300 px-4 py-2 mt-2 outline-none"
                required
              />
            </div>

            <div className="hidden md:block h-12 w-px bg-gray-300"></div>

            <div className="flex flex-col">
              <label className="font-medium text-sm">Check-Out</label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="rounded border border-gray-300 px-4 py-2 mt-2 outline-none"
                required
              />
            </div>

            <div className="hidden md:block h-12 w-px bg-gray-300"></div>

            <div className="flex flex-col">
              <label className="font-medium text-sm">Guests</label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="rounded border border-gray-300 px-4 py-2 mt-2 outline-none w-24"
                required
              />
            </div>

          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-3 rounded-xl font-medium w-full md:w-auto transition active:scale-95"
            >
              Check Availability
            </button>

            {!user && (
              <Link
                to="/signin"
                className="text-center bg-black hover:bg-black/90 text-white px-12 py-3 rounded-xl font-medium w-full md:w-auto transition active:scale-95"
              >
                Login to Book
              </Link>
            )}

            {user && (
              <button
                type="button"
                onClick={bookRoom}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-xl font-medium w-full md:w-auto transition active:scale-95"
              >
                Book Now
              </button>
            )}
          </div>

        </div>
      </form>

      {/* Common Specifications */}
      <div className="mt-24 space-y-6">
        {roomCommonData?.map((spec, index) => (
          <div key={index} className="flex items-start gap-4">
            <img src={spec.icon} alt="icon" className="w-6" />
            <div>
              <p className="text-base font-medium">{spec.title}</p>
              <p className="text-gray-500 text-sm">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to
          availability. You get a comfortable two bedroom apartment
          that has a true city feeling.
        </p>
      </div>

      {/* Hosted by */}
      <div className="flex flex-col items-start gap-4 mt-16">
        <div className="flex items-center gap-4">
          <img
            src={room.hotel?.owner?.image || assets.userIcon}
            alt="Host"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg md:text-xl font-medium">
              Hosted by {room.hotel?.owner?.name || room.hotel?.name}
            </p>
            <div className="flex items-center mt-1">
              <StarRating rating={room.rating} />
              <p className="ml-2">200+ reviews</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Host contacted successfully!")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition active:scale-95"
        >
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
