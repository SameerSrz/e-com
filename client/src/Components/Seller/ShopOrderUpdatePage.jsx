import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import UpdateOrder from './UpdateOrder'

const ShopOrderUpdatePage = () => {
  return (
    <>
         <DashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={3}/>
            </div>
            <div className="w-full justify-center flex">
             <UpdateOrder/>
            </div>
        </div>
    </>
  )
}

export default ShopOrderUpdatePage
