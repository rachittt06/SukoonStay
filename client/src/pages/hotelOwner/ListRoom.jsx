import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const ListRoom = () => {
  const { axios, getToken } = useAppContext()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const token = await getToken()
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data?.success) setRooms(data.rooms || [])
      else toast.error(data?.message || 'Failed to load rooms')
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const toggleAvailability = async (roomId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        '/api/rooms/toggle-availability',
        { roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data?.success) {
        toast.success(data.message || 'Updated')
        fetchRooms()
      } else {
        toast.error(data?.message || 'Failed to update')
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    }
  }

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="List Rooms"
        subTitle="Manage your room listings and availability."
      />

      <div className="mt-8">
        {loading && <p className="text-gray-500">Loading rooms...</p>}

        {!loading && rooms.length === 0 && (
          <p className="text-gray-500">No rooms found. Add one from “Add Room”.</p>
        )}

        {!loading && rooms.length > 0 && (
          <div className="w-full max-w-4xl border border-gray-300 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr] bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
              <div>Room</div>
              <div className="text-center">Price</div>
              <div className="text-center">Availability</div>
            </div>

            {rooms.map((r) => (
              <div
                key={r._id}
                className="grid grid-cols-[2fr_1fr_1fr] px-4 py-4 border-t border-gray-300 items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={r.images?.[0]}
                    alt="room"
                    className="w-20 h-14 rounded-lg object-cover bg-gray-100"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{r.roomType}</p>
                    <p className="text-xs text-gray-500">{r.hotel?.city}</p>
                  </div>
                </div>

                <div className="text-center text-gray-700">₹ {r.pricePerNight}</div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => toggleAvailability(r._id)}
                    className={`py-1 px-3 text-xs rounded-full ${
                      r.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.isAvailable ? "Available" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListRoom