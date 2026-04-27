import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyBookings = () => {

    const { axios, getToken } = useAppContext()
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchBookings = async () => {
        try {
          setLoading(true)
          const token = await getToken()
          if (!token) {
            setBookings([])
            return
          }
          const { data } = await axios.get('/api/bookings/user', {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (data?.success) setBookings(data.bookings || [])
          else toast.error(data?.message || 'Failed to fetch bookings')
        } catch (e) {
          toast.error(e?.response?.data?.message || e.message)
        } finally {
          setLoading(false)
        }
      }

      fetchBookings()
    }, [axios, getToken])

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
            
            <Title 
                title="My Bookings" 
                subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks" 
                align='left'
            />

            {!user && (
              <div className="mt-10">
                <Link
                  to="/signin"
                  className="inline-flex px-6 py-2 rounded-full text-sm bg-black text-white hover:bg-black/90 transition"
                >
                  Login to view bookings
                </Link>
              </div>
            )}

            {user && (
              <div className="max-w-6xl mt-8 w-full">
                <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
                  <div>Hotels</div>
                  <div>Date & Timings</div>
                  <div>Payment</div>
                </div>

                {loading && <p className="mt-6 text-gray-500">Loading bookings...</p>}

                {!loading && bookings.length === 0 && (
                  <p className="mt-6 text-gray-500">No bookings yet.</p>
                )}

                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 w-full border-b border-gray-200 py-6"
                  >
                    {/* 🔹 Hotel Info */}
                    <div className="flex gap-4">
                      <img
                        src={booking.room?.images?.[0]}
                        alt="hotel"
                        className="w-32 h-24 object-cover rounded-lg"
                      />

                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="font-semibold text-lg">
                            {booking.hotel?.name}
                            <span className="text-sm text-gray-500 ml-2">
                              ({booking.room?.roomType})
                            </span>
                          </p>

                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <img src={assets.locationIcon} className="w-4" />
                            {booking.hotel?.address}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            Guests: {booking.guests || 1}
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
                        {String(booking.checkInDate).slice(0, 10)}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">Check-Out:</span>{" "}
                        {String(booking.checkOutDate).slice(0, 10)}
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
                        <button
                          type="button"
                          className="mt-2 px-4 py-1 border rounded-full text-sm hover:bg-gray-100"
                          onClick={() => toast("Payments not implemented yet")}
                        >
                          Pay now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
    );
}

export default MyBookings