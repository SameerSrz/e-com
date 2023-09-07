import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import CreateEvent from './CreateEvent'

const CreateEventPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={6}/>
            </div>
            <div className="w-full justify-center flex">
              <CreateEvent/>
            </div>
        </div>
    </>
  )
}

export default CreateEventPage
