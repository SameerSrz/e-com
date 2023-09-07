import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import ShopAllEvents from './ShopAllEvents'

const ShopAllEventsPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={5}/>
            </div>
            <div className="w-full justify-center flex">
              <ShopAllEvents/>
            </div>
        </div>
   </>
  )
}

export default ShopAllEventsPage
