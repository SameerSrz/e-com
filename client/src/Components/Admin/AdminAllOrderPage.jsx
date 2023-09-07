import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllOrders from './AllOrders'

const AdminAllOrderPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={2}/>
            </div>
            <div className="w-full justify-center flex">
              <AllOrders/>
            </div>
        </div>
    </>
  )
}

export default AdminAllOrderPage
