import React from 'react'
import { roomsDummyData, assets, facilityIcons } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

const AllRooms = () => {
  const navigate = useNavigate()

  return (
    <div className='pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      
      <div className='mb-10'>
        <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-xl'>
          Take advantage of our limited-time offers and special packages to enhance your stay.
        </p>
      </div>

      <div className='flex flex-col gap-10'>
        {roomsDummyData.map(room => (
          <div key={room._id} className='flex flex-col md:flex-row items-start gap-6 border-b border-gray-300 last:pb-30 last:border-0'>

            <img
              onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0,0) }}
              src={room.images[0]}
              alt=""
              className='w-full md:w-[300px] h-[220px] flex-shrink-0 rounded-xl shadow-lg object-cover cursor-pointer'
            />

            <div className='flex-1 flex flex-col gap-2'>
              <p className='text-gray-500'>{room.hotel.city}</p>

              <p
                onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0,0) }}
                className='text-gray-800 text-3xl font-playfair cursor-pointer'
              >
                {room.hotel.name}
              </p>

              <div className='flex items-center'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
              </div>

              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="" className='w-4 h-4'/>
                <span>{room.hotel.address}</span>
              </div>
              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {room.amenities.map((item, index)=>(
                  <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                    <img src={facilityIcons[item]} alt={item}
                    className='w-5 h-5' />
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>
              {/* Room Price per Night */}
              <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllRooms