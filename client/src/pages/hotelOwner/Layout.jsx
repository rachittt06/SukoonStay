import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
    const {isOwner, navigate} = useAppContext()

    useEffect (() => {
        if(!isOwner){
            navigate('/')
        }

    },[isOwner])
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />

            {/* IMPORTANT */}
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />

                <div className='flex-1 p-6 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout 