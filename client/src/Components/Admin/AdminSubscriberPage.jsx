import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllSubscribers from './AllSubscribers'

const AdminSubscriberPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={11}/>
            </div>
            <div className="w-full justify-center flex">
              <AllSubscribers/>
            </div>
        </div>
    </>
  )
}

export default AdminSubscriberPage
