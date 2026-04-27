import React, { useMemo, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const AddRoom = () => {
  return (
    <AddRoomInner />
  )
}

export default AddRoom

const AddRoomInner = () => {
  const { axios, getToken } = useAppContext()
  const [roomType, setRoomType] = useState("Double Bed")
  const [pricePerNight, setPricePerNight] = useState("")
  const [amenities, setAmenities] = useState([])
  const [imageUrls, setImageUrls] = useState([""])
  const [submitting, setSubmitting] = useState(false)

  const amenityOptions = useMemo(() => ([
    "Free WiFi",
    "Free Breakfast",
    "Room Service",
    "Mountain View",
    "Pool Access",
  ]), [])

  const roomTypes = useMemo(() => ([
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
  ]), [])

  const toggleAmenity = (a) => {
    setAmenities((prev) => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  const updateImageUrl = (index, value) => {
    setImageUrls((prev) => prev.map((url, i) => (i === index ? value : url)))
  }

  const addImageField = () => {
    setImageUrls((prev) => [...prev, ""])
  }

  const removeImageField = (index) => {
    setImageUrls((prev) => {
      if (prev.length === 1) return prev
      return prev.filter((_, i) => i !== index)
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!pricePerNight) return toast.error("Please enter price per night")
    const cleanedImageUrls = imageUrls.map((url) => url.trim()).filter(Boolean)
    if (!cleanedImageUrls.length) return toast.error("Please enter at least 1 image URL")

    try {
      setSubmitting(true)
      const token = await getToken()
      const { data } = await axios.post("/api/rooms", {
        roomType,
        pricePerNight,
        amenities,
        images: cleanedImageUrls
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (data?.success) {
        toast.success(data.message || "Room created")
        setPricePerNight("")
        setAmenities([])
        setImageUrls([""])
      } else {
        toast.error(data?.message || "Failed to create room")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Create a new room listing with image URLs, price, and amenities."
      />

      <form onSubmit={onSubmit} className="mt-8 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600 font-medium">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            >
              {roomTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Price / Night (₹)</label>
            <input
              type="number"
              min="1"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              placeholder="e.g. 2499"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-600 font-medium">Amenities</label>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenityOptions.map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                />
                <span>{a}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-600 font-medium">Image URLs</label>
          <div className="mt-3 space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
                  placeholder="https://example.com/room-image.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
                  disabled={imageUrls.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
            >
              Add another image URL
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-3 rounded-xl font-medium transition"
        >
          {submitting ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  )
}