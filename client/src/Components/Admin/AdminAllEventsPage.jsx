import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AllEvents from './AllEvents'

const AdminAllEventsPage = () => {
  return (
   <>
    <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={4}/>
            </div>
            <div className="w-full justify-center flex">
              <AllEvents/>
            </div>
        </div>
   </>
  )
}

export default AdminAllEventsPage
