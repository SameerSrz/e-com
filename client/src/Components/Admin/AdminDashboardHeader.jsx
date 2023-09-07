import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { backend_url } from '../../server'

const AdminDashboardHeader = () => {
  return (
    <>
         <div className="w-full h-[80px] bg-[#28559A] sticky top-0 left-0 z-30 flex items-center justify-between px-4 mb-3">
            <div className='pl-4'>
                <Link to='/admin'>
                <img src={`${backend_url}//uploads//MiniMarg-removebg-preview.png`} style={{filter: "brightness(0) invert(1)" , width: '150px', height: '80px' }} alt="" />
                </Link>
            </div>
            <div className="flex itmes-center">
                <div className="flex itmes-center mr-4">
                    <Link to='/admin-all-coupons' className='800px:block hidden'>
                        <AiOutlineGift size={30} color='#fff' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to='/admin-all-events' className='800px:block hidden'>
                        <MdOutlineLocalOffer size={30} color='#fff' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to='/admin-all-products' className='800px:block hidden'>
                        <FiShoppingBag size={30} color='#fff' className='mx-3 cursor-pointer'/>
                    </Link>
                    <Link to='/admin-all-orders' className='800px:block hidden'>
                        <FiPackage size={30} color='#fff' className='mx-3 cursor-pointer'/>
                    </Link>
                    {/* <Link to={`/shop/${seller._id}`}>
                        <img src={`${backend_url}${seller.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover' />
                    </Link> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminDashboardHeader
