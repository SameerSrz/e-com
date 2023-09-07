import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import styles from '../../Styles/styles';
import axios from 'axios';
import { server } from '../../server';

const RelatedProducts = ({data}) => {
    const [products,setProducts] = useState([])
    const [productData,setProductData] = useState();
   
    useEffect(() => {
        axios
          .get(`${server}/product/get-all-products`)
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
          
      }, []);
      useEffect(() => {
          const filtered = products.filter((i) => i.category === data.category);
          setProductData(filtered);
        
      }, [products]);
  return (
    <>
        <div className='flex justify-between'>
            {data ? (
                <div className={`p-4 ${styles.section}`}>
                <h2
                    className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
                >
                    Related Product
                </h2>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        productData && productData.map((i,index) => (
                            <ProductCard data={i} key={index} />
                        ))
                    }
            </div>
                </div>
            ) : null}
        </div>
    </>
  )
}

export default RelatedProducts
