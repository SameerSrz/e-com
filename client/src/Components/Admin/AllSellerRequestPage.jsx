import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllSellerRequest from './AllSellerRequest'

const AllSellerRequestPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={9}/>
            </div>
            <div className="w-full justify-center flex">
              <AllSellerRequest/>
            </div>
        </div>
    </>
  )
}

export default AllSellerRequestPage
