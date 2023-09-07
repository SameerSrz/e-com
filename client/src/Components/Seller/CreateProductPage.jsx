import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import CreateProduct from './CreateProduct'

const CreateProductPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items-center jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={4}/>
            </div>
            <div className="w-full justify-center flex">
              <CreateProduct/>
            </div>
        </div>
   </>
  )
}

export default CreateProductPage
