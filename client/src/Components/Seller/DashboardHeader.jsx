import React, { useEffect } from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import {FiPackage, FiShoppingBag} from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { backend_url, uploads } from '../../server'
import Loader from '../../Loader'

const DashboardHeader = () => {
    const Navigate = useNavigate();
    const {isSeller,seller,isLoading} = useSelector((state)=>state.seller)
    useEffect(()=>{
      if(isLoading === true)
      {
          return <Loader/>
      }
    },[isLoading,isSeller])
    console.log(seller)
    //console.log(seller)
  return (
    <>
            <div className="w-full h-[80px] bg-white sticky top-0 left-0 z-30 flex items-center justify-between px-4">
            <div>
                <Link to='/dashboard'>
                    <img src={`${backend_url}//uploads//MiniMarg-removebg-preview.png`} style={{ width: '150px', height: '80px' }} alt="" />
                </Link>
            </div>
            <div className="flex itmes-center">
                <div className="flex itmes-center mr-4">
                    <Link to='/dashboard/coupons' className='800px:block hidden'>
                        <AiOutlineGift size={30} color='#555' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to='/dashboard-events' className='800px:block hidden'>
                        <MdOutlineLocalOffer size={30} color='#555' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to='/dashboard-products' className='800px:block hidden'>
                        <FiShoppingBag size={30} color='#555' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to='/dashboard-orders' className='800px:block hidden'>
                        <FiPackage size={30} color='#555' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to={`/shop/${seller._id}`}>
                        <img src={`${backend_url}${seller.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover' />
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default DashboardHeader
