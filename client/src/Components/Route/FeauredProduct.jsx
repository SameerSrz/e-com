import React, { useEffect, useState } from 'react'
import styles from '../../Styles/styles'
import { productData } from '../../Static/Data'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { server } from '../../server'
import axios from 'axios'


const FeauredProduct = () => {
    const {products,AllProducts} = useSelector((state)=>state.products)
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get(`${server}/product/get-all-products`).then((res)=>{
            setData(res.data.products)
        }).catch((err)=>{
            console.log(err)
        })
        window.scrollTo(0,0);
    },[])

  return (
    <>
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Featured Product</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {
                        data && data.map((i,index) => <ProductCard data={i} key={index} />)
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default FeauredProduct
