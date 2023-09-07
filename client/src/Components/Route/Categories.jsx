import React from 'react'
import styles from '../../Styles/styles'
import { brandingData } from '../../Static/Data'

const Categories = () => {
  return (
    <>
        <div className={`${styles.section} hidden sm:block`}>
            <div className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}>
                { 
                    brandingData && brandingData.map((i,index)=>(
                        <div className='flex items-start' key={index}>
                            {i.icon}
                            <div className='px-3'>
                                <h3 className='font-bold text-sm md:text-base'>
                                    {i.title}
                                </h3>
                                <p className='text-sm md:text-sm'>
                                    {i.Description}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Categories
