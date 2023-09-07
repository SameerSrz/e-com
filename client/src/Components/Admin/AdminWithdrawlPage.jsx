import React, { useEffect, useState } from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import AdminWithdrawl from './AdminWithdrawl'
import axios from 'axios'
import { server } from '../../server'

const AdminWithdrawlPage = () => {
//   const [data,setData] = useState([])
//   useEffect(()=>{
//     axios.get(`${server}/withdrawl/get-all-withdraw-request`).then((res)=>{
//         setData(res.data.withdraws)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={5}/>
            </div>
            <div className="w-full justify-center flex">
              <AdminWithdrawl/>
            </div>
        </div>
    </>
  )
}

export default AdminWithdrawlPage
