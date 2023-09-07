import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import ShopAllOrderRefund from './ShopAllOrderRefund.jsx'

const ShopOrderRefund = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={10}/>
            </div>
            <div className="w-full justify-center flex">
              <ShopAllOrderRefund/>
            </div>
        </div>
    </>
  )
}

export default ShopOrderRefund
