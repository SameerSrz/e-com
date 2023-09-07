import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllSellers from './AllSellers'

const AdminAllSellersPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={8}/>
            </div>
            <div className="w-full justify-center flex">
              <AllSellers/>
            </div>
        </div>
    </>
  )
}

export default AdminAllSellersPage
