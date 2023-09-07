import React from 'react'
import DashboardSideBar from './DashboardSideBar'
import AdminDashboardHeader from './AdminDashboardHeader'
import AllProducts from './AllProducts.jsx'

const AdminAllProductPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={3}/>
            </div>
            <div className="w-full justify-center flex">
              <AllProducts/>
            </div>
        </div>
    </>
  )
}

export default AdminAllProductPage
