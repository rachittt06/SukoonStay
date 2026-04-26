import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const HotelReg = () => {


    const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext()

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")

    const onSubmitHandler = async (event) => {
  try {
    event.preventDefault();

    const token = await getToken();

    const { data } = await axios.post(
      "/api/hotels",
      { name, phone, address, city },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      toast.success(data.message);
      setIsOwner(true);
      setShowHotelReg(false);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

    return (
        <div  onClick ={()=> setShowHotelReg(false)} className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
            
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'
            >
                
                <img 
                    src={assets.regImage} 
                    alt="reg-image" 
                    className='w-1/2 rounded-xl hidden md:block'
                /> 

                <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                    
                    {/* CLOSE BUTTON */}
                    <img 
                        src={assets.closeIcon} 
                        alt="close-icon" 
                        onClick={() => setShowHotelReg(false)}
                        className='absolute top-4 right-4 h-4 w-4 cursor-pointer'
                    />

                    <p className='text-2xl font-semibold mt-6'>
                        Register Your Hotel
                    </p>

                    {/* Hotel Name */}
                    <div className='w-full mt-4'>
                        <label className="font-medium text-gray-500">Hotel Name</label>
                        <input
                            id = 'name'
                            onChange={(e) => setName(e.target.value)} value = {name}
                            type="text"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className='w-full mt-4'>
                        <label className="font-medium text-gray-500">Phone</label>
                        <input
                            onChange={(e) => setPhone(e.target.value)} value = {phone}
                            id = 'phone'
                            type="text"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className='w-full mt-4'>
                        <label className="font-medium text-gray-500">Address</label>
                        <input
                            onChange={(e) => setAddress(e.target.value)} value = {address}
                            id = 'address'
                            type="text"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1"
                            required
                        />
                    </div>

                    {/* City */}
                    <div className='w-full mt-4'>
                        <label className="font-medium text-gray-500">City</label>
                        <select
                            onChange={(e) => setCity(e.target.value)} value = {city}
                            id = "city"
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1'
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className='w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg'
                    >
                        Register
                    </button>

                </div>
            </form>
        </div>
    )
}

export default HotelReg;