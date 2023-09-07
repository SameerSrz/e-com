import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllCoupons from './AllCoupons'

const AdminAllCouponsPage = () => {
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={6}/>
            </div>
            <div className="w-full justify-center flex">
              <AllCoupons/>
            </div>
        </div>
    </>
  )
}

export default AdminAllCouponsPage
