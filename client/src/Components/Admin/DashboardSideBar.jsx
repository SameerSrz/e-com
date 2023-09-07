import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer, MdOutlineUnsubscribe } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { VscNewFile } from 'react-icons/vsc'
import { CiMoneyBill, CiSettings } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { BiCategoryAlt, BiMessageSquareDetail, BiMoneyWithdraw } from 'react-icons/bi'
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import { BsPersonFill, BsPerson, BsPersonAdd } from 'react-icons/bs'
import { GoPersonAdd } from 'react-icons/go'

const DashboardSideBar = ({active}) => {
  return (
    <>
        <div className="w-full h-[120vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
            {/* Single Item */}
            <div className="w-full flex items-center p-4">
                <Link to='/admin' className='w-full flex items-center'>
                    <RxDashboard size={30} color={`${active ===1 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Dashboard
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-orders' className='w-full flex items-center'>
                    <FiShoppingBag size={30} color={`${active ===2 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        All Orders
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-products' className='w-full flex items-center'>
                    <FiPackage size={30} color={`${active ===3 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        All Products
                    </h5>
                </Link>
            </div>
            {/* <div className="w-full flex items-center p-4">
                <Link to='/dashboard-create-products' className='w-full flex items-center'>
                    <AiOutlineFolderAdd size={30} color={`${active ===4 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Create Product
                    </h5>
                </Link>
            </div> */}
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-events' className='w-full flex items-center'>
                    <MdOutlineLocalOffer size={30} color={`${active === 4 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        All Events
                    </h5>
                </Link>
            </div>
            {/* <div className="w-full flex items-center p-4">
                <Link to='/dashboard-create-events' className='w-full flex items-center'>
                    <VscNewFile size={30} color={`${active === 6 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Create Event
                    </h5>
                </Link>
            </div> */}
            <div className="w-full flex items-center p-4">
                <Link to='/admin-withdrawl-request' className='w-full flex items-center'>
                    <BiMoneyWithdraw size={30} color={`${active === 5 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Withdrawl Request
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-coupons' className='w-full flex items-center'>
                    <AiOutlineGift size={30} color={`${active === 6 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        All Coupons
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-customers' className='w-full flex items-center'>
                    <BsPersonFill size={30} color={`${active === 7 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        All Customers
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-sellers' className='w-full flex items-center'>
                    <BsPerson size={30} color={`${active === 8 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        All Sellers
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-all-sellers-request' className='w-full flex items-center'>
                    <BsPersonAdd size={30} color={`${active === 9 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 9 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Seller Requests
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-create-category' className='w-full flex items-center'>
                    <BiCategoryAlt size={30} color={`${active === 10 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 10 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Create Category
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to='/admin-subscriber' className='w-full flex items-center'>
                    <MdOutlineUnsubscribe size={30} color={`${active === 11 ? "crimson" : "#555" }`}/>
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 11 ? "text-[crimson]" : "text-[#555]"} 800px:block hidden`}>
                        Subscribers
                    </h5>
                </Link>
            </div>
        </div>
    </>
  )
}

export default DashboardSideBar
