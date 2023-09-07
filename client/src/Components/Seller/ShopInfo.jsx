import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { backend_url } from '../../server'
import styles from '../../Styles/styles'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import {server} from '../../server'

const ShopInfo = ({isOwner}) => {
    const Navigate = useNavigate();
    const {seller} = useSelector((state)=>state.seller)

     const { id } = useParams();
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get(`${server}/get-shop-info/${id}`).then((res)=>{
                    setData(res.data.shop)
                    console.log(res.data.shop)
                }).catch((err)=>{
                    console.log(err)
                })
    })


    const logoutHandler = () =>{
        axios.get(`${server}/seller/logout`,{withCredentials: true}).then((res)=>{
            toast.success(res.data.message);
            Navigate("/seller-login");
            window.location.reload(true);
        }).catch((err=>{
            toast.error(err.response.data.message);
        }))
    }
    
  return (
    <>
        <div>
            <div className="w-full py-5">
                <div className="w-full flex justify-center">
                    <img src={`${backend_url}${data?.avatar}`} alt="" className='w-[150px] h-[150px] object-cover rounded-full'/>
                </div>
                <h3 className='text-center font-semibold py-3 text-[20px]'>
                    {data?.shopName}
                </h3>
                <p className='text-[16px] text-[#0000006a] p-[10px] flex items-center'>
                    {data?.description}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ducimus, impedit facilis autem vel provident vitae soluta debitis labore quod quas delectus animi. Magni nisi laboriosam placeat mollitia, ducimus veniam?
                </p>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Seller Name</h5>
                <h4 className='text-[#0000006a] '>{data?.name}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Address</h5>
                <h4 className='text-[#0000006a] '>{data?.address}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Phone Number</h5>
                <h4 className='text-[#0000006a] '>{data?.phoneNumber}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Email</h5>
                <h4 className='text-[#0000006a] '>{data?.email}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Joined On</h5>
                <h4 className='text-[#0000006a] '>{data?.createdAt}</h4>
            </div>
            {
                seller ? (
                    <div className="py-3 px-4">
                        {/* <div className={`${styles.button} !w-full !h-[42px] rounded-[5px]`}>
                            <span className='text-white'>
                                Edit Shop
                            </span>
                        </div> */}
                        <div className={`${styles.button} !w-full !h-[42px] rounded-[5px]`} onClick={logoutHandler}>
                            <span className='text-white'>
                                Log Out
                            </span>
                        </div>
                    </div>
                ) : null
            }
        </div>
    </>
  )
}

export default ShopInfo
