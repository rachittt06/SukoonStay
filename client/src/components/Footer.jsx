import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Footer = () => {

  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (!email) {
      alert("Please enter your email")
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      alert("Enter a valid email")
      return
    }

    alert("Subscribed successfully!")
    setEmail("")
  }

  return (
    <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
      
      <div className='flex flex-wrap justify-between gap-12 md:gap-6'>

        {/* Logo + Description */}
        <div className='max-w-80'>
          
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            SukoonStay
          </h1>

          <p className='text-sm'>
            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
          </p>

          <div className='flex items-center gap-3 mt-4'>
            <img src={assets.instagramIcon} alt="instagram" className='w-6'/>
            <img src={assets.facebookIcon} alt="facebook" className='w-6'/>
            <img src={assets.twitterIcon} alt="twitter" className='w-6'/>
            <img src={assets.linkendinIcon} alt="linkedin" className='w-6'/>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className='max-w-80'>
          <p className='text-lg text-gray-800'>STAY UPDATED</p>
          <p className='mt-3 text-sm'>
            Subscribe to our newsletter for inspiration and special offers.
          </p>

          <form onSubmit={handleSubscribe} className='flex items-center mt-4'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none w-full'
              placeholder='Your email'
              required
            />
            <button 
              type="submit"
              className='flex items-center justify-center bg-black h-9 w-9 rounded-r active:scale-95 transition'
            >
              <img src={assets.arrowIcon} alt="arrow" className='w-3.5 invert' />
            </button>
          </form>
        </div>

      </div>

      <hr className='border-gray-300 mt-8' />

      <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
        <p>© {new Date().getFullYear()} SukoonStay. All rights reserved.</p>
        <ul className='flex items-center gap-4'>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>

    </div>
  )
}

export default Footer