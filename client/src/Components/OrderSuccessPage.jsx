import React, { useEffect } from 'react'
import Header from './layout/Header'
import { CheckoutSteps } from './CheckoutPage'
import Footer from './layout/Footer'
import Lottie from 'lottie-react'
import animationData from '../Assets/Animation/96295-success-popup.json'

const OrderSuccessPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <>
        <Header/>
        <br />
        <br />
        <CheckoutSteps active={3}/>
        <SuccessAnimation/>
        <br />
        <br />
        <Footer/>
    </>
  )
}

const SuccessAnimation = ()=>{
    
    return(
        <>
        {/* <Lottie animationData={animationData} width={60} height={60} /> */}
            <div className='w-full h-[40vh] flex items-center justify-center'>
                 <Lottie animationData={animationData} style={{width: 300, height: 250}} />
            </div>
            <div className='w-full flex items-center justify-center font-semibold font-Roboto '>
                 <h1>Your Order is Placed Successfully!</h1>
            </div>
        </>
    )
}

export default OrderSuccessPage
