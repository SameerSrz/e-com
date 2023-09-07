import React from 'react'
import styles from '../../Styles/styles'
import CountDown from './CountDown'
import { useSelector } from 'react-redux'
import { backend_url } from '../../server'

const EventCard = ({active, data}) => {
    console.log(data)
  return (
    <>
        <div className={`w-full bg-white rounded-lg block ${active ? "unset" : "mb-12" } lg:flex p-2 `}>
            <div className="w-full lg:-w[50%] m-auto">
                <img src={`${backend_url}//uploads//${data?.images[0]}`} alt="" />
            </div>
            <div className="w-full lg:[w-50%] flex flex-col justify-center">
                <h2 className={`${styles.productTitle}`}>{data.name}</h2>
                <p>{data.description}</p>
                <div className="flex justify-between py-2">
                    <div className="flex">
                        <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                            {data.originalPrice}$
                        </h5>
                        <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
                            {data.discountPrice}$
                        </h5>
                    </div>
                    <span className='pr-3 font-[400] text-[17px] text-[#44a55b] '>
                        {data.sold_out} sold
                    </span>
                </div>
                <div>
                <CountDown start_Date={data.start_Date} Finish_Date={data.Finish_Date} />
                </div>
                {/* <CountDown start_Date={data.start_Date} Finish_Date={data.Finish_Date} /> */}
                <br />
                <h5>Hurry Up! Only {data.stock} pieces Left in Stock.</h5>
            </div>
        </div>
    </>
  )
}

export default EventCard
