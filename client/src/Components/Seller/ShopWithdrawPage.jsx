import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import Withdraw from './Withdraw'

const ShopWithdrawPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={7}/>
            </div>
            <div className="w-full justify-center flex">
             <Withdraw/>
            </div>
        </div>
    </>
  )
}

export default ShopWithdrawPage
