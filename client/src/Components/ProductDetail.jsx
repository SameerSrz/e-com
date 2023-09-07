import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ProductPage from './ProductDetailPage'
import { useParams } from 'react-router-dom'
import { productData } from '../Static/Data'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { server } from '../server'
import RelatedProducts from './Route/RelatedProducts'

const ProductDetail = () => {
    const {id} = useParams();
    //const {name} = useParams();
    const { products, allProducts } = useSelector((state) => state.products);

    const [data,setData] = useState(null);
    //const productName = name.replace(/-/g," ");
    const dispatch = useDispatch();
    console.log(products)
    useEffect(()=>{
      axios.get(`${server}/get-shop-product/${id}`).then((res)=>{
        setData(res.data.product)
        console.log(res.data.product)
    }).catch((err)=>{
        console.log(err)
    })
        const data = productData.find((i) => i._id === id);
        console.log(data);
        setData(data);
    },[])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <ProductPage data={data} />
        </div>
        <div className="mt-auto">
          {/* <RelatedProducts data={data} />
          <Footer /> */}
        </div>
      </div>

    </>
  )
}

export default ProductDetail
