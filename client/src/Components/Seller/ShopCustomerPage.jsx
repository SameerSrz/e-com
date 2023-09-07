import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import ShopCustomers from './ShopCustomers'

const ShopCustomerPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items-start jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={11}/>
            </div>
            <ShopCustomers/>
        </div>
    </>
  )
}

export default ShopCustomerPage
