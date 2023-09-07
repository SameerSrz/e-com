import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllCustomers from './AllCustomers'

const AllCustomersPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={7}/>
            </div>
            <div className="w-full justify-center flex">
              <AllCustomers/>
            </div>
        </div>
    </>
  )
}

export default AllCustomersPage
