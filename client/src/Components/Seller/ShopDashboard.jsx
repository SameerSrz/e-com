import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import DashboardHero from './DashboardHero'

const ShopDashboard = () => {
  return (
   <>
    <DashboardHeader/>
    <div className="flex items-start jutify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
            <DashboardSideBar active={1}/>
        </div>
        <DashboardHero/>
    </div>
   </>
  )
}

export default ShopDashboard
