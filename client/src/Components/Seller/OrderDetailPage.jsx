import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import OrderDetail from './OrderDetail'
import DashboardHeader from './DashboardHeader'

const OrderDetailPage = () => {
  return (
    <>
        <DashboardHeader/>
        <OrderDetail/>
        <Footer/>
    </>
  )
}

export default OrderDetailPage
