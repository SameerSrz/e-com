import React, { useEffect, useState } from 'react'
// import { productData } from '../../Static/Data'
import ProductCard from '../Route/ProductCard'
import { Link, useParams } from 'react-router-dom'
import styles from '../../Styles/styles'
import {  useSelector } from 'react-redux'
// import {getAllProducts} from '../../redux/action/product'
// import { getAllEvents } from '../../redux/action/event'
import axios from 'axios'
import { server } from '../../server'
import Ratings from '../Ratings'
import { backend_url } from '../../server'

const ShopProfileData = ({isOwner}) => {
    const [active,setActive] = useState(1)
    // const {products} = useSelector((state)=>state.products)
    const {seller} = useSelector((state)=>state.seller)
    // const {events} = useSelector((state)=>state.events)
    const [events,setEvents] = useState([])
    // const { id } = useParams();
    // const dispatch = useDispatch();
    const [data,setData] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`${server}/product/get-all-products/${id}`).then((res)=>{
            setData(res.data.products)
            // console.log(res.data.products)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get(`${server}/product/get-all-events/${id}`)
          .then((res) => {
            setEvents(res.data.events);
          })
          .catch((err) => {
            console.log(err);
          });
        
    },[])
    const allReviews = data && data.map((product) => product.reviews).flat();
   
  return (
    <>
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <div className='w-full flex'>
                    <div className="flex items-center ml-[30px] pr-[20px]" onClick={()=>setActive(1)}>
                        <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"} cursor-pointer`}>
                            Shop Products
                        </h5>
                    </div>
                    <div className="flex items-center pr-[20px] " onClick={()=>setActive(2)}>
                        <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"} cursor-pointer`}>
                            Running Events
                        </h5>
                    </div>
                    <div className="flex items-center pr-[20px]" onClick={()=>setActive(3)}>
                        <h5 className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"} cursor-pointer`}>
                            Shop Reviews
                        </h5>
                    </div>
                </div>
                <div>
                    {
                        seller ? (
                            <div>
                                <Link to='/dashboard'>
                                    <div className={`${styles.button} rounded-[4px] h-[42px] mr-[20px]`}>
                                        <span className='text-white'>Go Dashboard</span>
                                    </div>
                                </Link>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <br />
            { active === 1 && (
                <div className='w-full'>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                        {
                            data && data.map((i,index)=>(
                                <ProductCard data={i} key={index} isShop={true}/>
                            ))
                        }
                    </div>
                    {   data && data.length === 0 && (
                        <h5 className="w-full text-center py-5 text-[18px]">
                        No Products have for this shop!
                        </h5>
                    )}
                 </div> 
                 )
            }
            {active === 2 && (
                <div className="w-full">
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                    {events &&
                    events.map((i, index) => (
                        <ProductCard
                        data={i}
                        key={index}
                        isShop={true}
                        isEvent={true}
                        />
                    ))}
                </div>
                {events && events.length === 0 && (
                    <h5 className="w-full text-center py-5 text-[18px]">
                    No Events have for this shop!
                    </h5>
                )}
                </div>
            )}
            {
                active === 3 && (
                <div className="w-full">
                {allReviews &&
                    allReviews.map((item, index) => (
                    <div className="w-full flex my-4">
                        <img
                        src={`${backend_url}//uploads//${item.user.avatar}`}
                        className="w-[50px] h-[50px] rounded-full"
                        alt=""
                        />
                        <div className="pl-2">
                        <div className="flex w-full items-center">
                            <h1 className="font-[600] pr-2">{item.user.name}</h1>
                            <Ratings rating={item.rating} />
                        </div>
                        <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                        <p className="text-[#000000a7] text-[14px]">{item.createdAt.slice(0,10)}</p>
                        </div>
                    </div>
                    ))}
                    {allReviews && allReviews.length === 0 && (
                        <h5 className="w-full text-center py-5 text-[18px]">
                        No Reviews have for this shop!
                        </h5>
                    )}
                </div>)
                }
        </div>
    </>
  )
}

export default ShopProfileData
