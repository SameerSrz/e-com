import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import styles from '../Styles/styles'
import { useSearchParams  } from 'react-router-dom'
import { productData } from '../Static/Data'
import ProductCard from './Route/ProductCard'
import Footer from './layout/Footer'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { server } from '../server'
import Loader from '../Loader'


const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [filteredData,setFilteredData] = useState([])

    useEffect(() => {
      setIsLoading(true);
      axios
        .get(`${server}/product/get-all-products`)
        .then((res) => {
          setData(res.data.products);
          setIsLoading(false);
          console.log(res.data.products);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
  
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {
      if (categoryData === null) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((i) => i.category === categoryData);
        setFilteredData(filtered);
      }
    }, [categoryData, data]);
      
    
  return (
    <>
        <Header activeHeading={3} />
        <br />
        <br />
        {isLoading ? <Loader/> : (<div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {
                  filteredData && filteredData.map((i,index)=><ProductCard data={i} key={index}/>)
                }
            </div>
            {data && data.length === 0 ? (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                        No products Found!
                    </h1>
                    ) : null}
        </div>)}
        <Footer/>
    </>
  )
}

export default ProductPage
