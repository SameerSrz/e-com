import React, { useEffect, useState } from 'react'
import { productData } from '../../Static/Data';
import styles from '../../Styles/styles'
import Productcard from './ProductCard'
import { useSelector } from 'react-redux';
import { server } from '../../server'
import axios from 'axios'

const BestDeals = () => {
    const [data,setData] = useState([]);
    const {products,AllProducts} = useSelector((state)=>state.products)
    
    useEffect(()=>{
        axios.get(`${server}/product/get-all-products`).then((res)=>{
            setData(res.data.products)
        }).catch((err)=>{
            console.log(err)
        })
        const d = data && data.sort((a,b)=>b.total_sell - a.total_sell);
        const firstFive = d.slice(0,5);
        setData(firstFive);
    },[])
  return (
    <>
        <div className={`${styles.section}`}>
             <div className={`${styles.heading}`}>
                <h1>Best Deals</h1>
             </div>
             <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4  lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
                    {
                        data && data.map((i,index)=>(
                            <Productcard data={i} key={index} />
                        ))
                    }
             </div>

        </div>
    </>
  )
}

export default BestDeals
