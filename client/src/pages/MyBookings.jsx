import React, { useState } from 'react'
import Title from '../components/Title'
import { userBookingsDummyData, assets } from '../assets/assets'

const MyBookings = () => {

    const [bookings, setBookings] = useState(userBookingsDummyData)

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
            
            <Title 
                title="My Bookings" 
                subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks" 
                align='left'
            />

            <div className='max-w-6xl mt-8 w-full'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                    <div>Hotels</div>
                    <div>Date & Timings</div>
                    <div>Payment</div>
                </div>
            </div>

            {bookings.map((booking) => (
  <div
    key={booking._id}
    className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 w-full border-b border-gray-200 py-6"
  >
    
    {/* 🔹 Hotel Info */}
    <div className="flex gap-4">
      <img
        src={booking.room.images[0]}
        alt="hotel"
        className="w-32 h-24 object-cover rounded-lg"
      />

      <div className="flex flex-col justify-between">
        <div>
          <p className="font-semibold text-lg">
            {booking.hotel.name}
            <span className="text-sm text-gray-500 ml-2">
              ({booking.room.roomType})
            </span>
          </p>

          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <img src={assets.locationIcon} className="w-4" />
            {booking.hotel.address}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Guests: 2
          </p>
        </div>

        <p className="font-medium mt-2">
          Total: ₹{booking.totalPrice}
        </p>
      </div>
    </div>

    {/* 🔹 Dates */}
    <div className="flex flex-col justify-center text-sm text-gray-600">
      <p>
        <span className="font-medium">Check-In:</span>{" "}
        {booking.checkInDate}
      </p>
      <p className="mt-1">
        <span className="font-medium">Check-Out:</span>{" "}
        {booking.checkOutDate}
      </p>
    </div>

    {/* 🔹 Payment */}
    <div className="flex flex-col justify-center items-start md:items-center">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            booking.paymentStatus === "Paid"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        ></span>

        <p
          className={`text-sm font-medium ${
            booking.paymentStatus === "Paid"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {booking.paymentStatus}
        </p>
      </div>

      {booking.paymentStatus !== "Paid" && (
        <button className="mt-2 px-4 py-1 border rounded-full text-sm hover:bg-gray-100">
          Pay now
        </button>
      )}
    </div>

  </div>
))}

        </div>
    )
}

export default MyBookings