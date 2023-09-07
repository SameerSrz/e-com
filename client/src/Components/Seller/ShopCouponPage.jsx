import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import ShopCoupons from './ShopCoupons.jsx'

const ShopCouponPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={9}/>
            </div>
            <div className="w-full justify-center flex">
            <ShopCoupons/>
            </div>
        </div>
    </>
  )
}

export default ShopCouponPage
