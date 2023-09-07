import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import ShopAllOrders from './ShopAllOrders'

const ShopAllOrdersPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={2}/>
            </div>
            <div className="w-full justify-center flex">
             <ShopAllOrders/>
            </div>
        </div>
    </>
  )
}

export default ShopAllOrdersPage
