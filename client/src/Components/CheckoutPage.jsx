import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import styles from '../Styles/styles'
import Checkout from './Checkout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const CheckoutPage = () => {
    
    useEffect(()=>{
       window.scrollTo(0,0)
    },[])

  return (
    <>
        <Header/>
        <br />
        <br />
        <CheckoutSteps active={1}/>
        <Checkout/>
        <br />
        <br />
        <Footer/>
    </>
  )
}


export const CheckoutSteps = ({active}) => {
    console.log(active);
  return (
    <div className='w-full flex justify-center'>
        <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
               <div className={`${styles.noramlFlex}`}>
                <div className={`${styles.cart_button}`}>
                       <span className={`${styles.cart_button_text}`}>1.Shipping</span>
                </div>
                <div className={`${
                    active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                }`} />
               </div>

               <div className={`${styles.noramlFlex}`}>
                <div className={`${active > 1 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                    <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                        2.Payment
                    </span>
                </div>
               </div>

               <div className={`${styles.noramlFlex}`}>
               <div className={`${
                    active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                }`} />
                <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                    <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                        3.Success
                    </span>
                </div>
               </div>
        </div>
    </div>
  )
}

export default CheckoutPage