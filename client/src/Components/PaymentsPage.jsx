import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { CheckoutSteps } from './CheckoutPage'
import Payments from './Payments'

const PaymentsPage = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
     },[])
  return (
    <>
        <Header/>
        <br />
        <br />
        <CheckoutSteps active={2}/>
        <Payments/>
        <br />
        <br />
        <Footer/>
    </>
  )
}

export default PaymentsPage
