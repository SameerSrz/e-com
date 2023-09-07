import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AdminDashboard from './AdminDashboard'

const AdminDashboardPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex items-start jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px] ">
                <DashboardSideBar active={1}/>
            </div>
            <div className="w-full justify-center flex">
              <AdminDashboard/>
            </div>
        </div>
    </>
  )
}

export default AdminDashboardPage
