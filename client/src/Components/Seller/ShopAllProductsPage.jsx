import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSidebar'
import AllProducts from './AllProducts.jsx'

const ShopAllProductsPage = () => {
  return (
    <>
        <DashboardHeader/>
        <div className="flex items jutify-between w-full">
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

export default ShopAllProductsPage
