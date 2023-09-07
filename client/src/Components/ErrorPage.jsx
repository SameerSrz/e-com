import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../Assets/Animation/147534-404-error.json'

const ErrorPage = () => {
  return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
        <Lottie animationData={animationData} width={300} height={300} />
    </div>
    </>
  )
}

export default ErrorPage
