import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Styles/styles';
import { AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url } from '../server';
import {  addTocart } from '../redux/action/cart';
// import { addToWishlist, removeFromWishlist } from '../redux/action/wishlist'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Ratings from './Ratings';
import axios from 'axios';
import { server } from '../server';
import RelatedProducts from './Route/RelatedProducts';
// import Footer from './layout/Footer';
// import ProductDetailsInfo from './ProductDetailsInfo';


const ProductDetailPage = ({data}) => {
    const [count,setCount] = useState(1);
    // const [click,setClick] = useState(false);
    const [products,setProducts] = useState([]);
    const [select,setSelect] = useState(1)
    const {cart} = useSelector((state)=> state.cart)
    // const Navigate = useNavigate();
    const dispatch = useDispatch()

    const incrementCount = () =>{
        setCount(count + 1);
    }
    const decrementCount = () =>{
        if(count > 1){
            setCount(count - 1);
        }
    }
    const handleMassageSubmit = ()=>{
        
        // console.log(data)
        window.open(`https://wa.me/92${data.shop.phoneNumber}`)

    }

    useEffect(()=>{
        axios.get(`${server}/product/get-all-products`).then((res)=>{
          setProducts(res.data.products)
      }).catch((err)=>{
          console.log(err)
      })
    },[])

    const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0);

    const totalRatings = products && products.reduce(
        (acc, product) =>
          acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
        0
      );
      const avg =  totalRatings / totalReviewsLength || 0;

      const averageRating = avg.toFixed(1);

  const handleAddToCart = (id,stock)=>{
    if(stock === 0)
        {
            toast.error("Item out of Stock")
        }else{
              const isItemExist = cart && cart.find((i)=> i._id === id)
              if(isItemExist){
                  toast.error("Item already exits in the cart");
              }else{
                  if(data.stock > count)
                { const cartData = {...data, qty: count}
                  dispatch(addTocart(cartData));
                  toast.success("item added to cart");
                  }else{
                      toast.error("Item stock is limited");
                  }
        }}
  }
  const imageStyle = {
    transition: 'transform 0.3s ease-in-out',
  };

  const handleMouseEnter = (event) => {
    event.target.style.transform = 'scale(1.4)';
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = 'scale(1)';
  };

  return (
    <>
        <div className="bg-white">
            {
                data ? (<>
                    <div className={`${styles.section} w-[90%] 800px:w-[80%] h-screen`}>
                        <div className="w-full py-5 min-h-[50vh]">
                            <div className="block w-full 800px:flex">
                                <div className='w-full 800px:w-[50%]'>
                                <img src={`${backend_url}//uploads//${data?.images[select]}`} alt="" className='w-[80%]' style={imageStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                                <div className="w-full flex">
                                        <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                            <img src={`${backend_url}//uploads//${data?.images[0]}`} alt="" 
                                                className='h-[200px]' onClick={()=> setSelect(0)}
                                            />
                                        </div>
                                        <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>
                                            <img src={`${backend_url}//uploads//${data?.images[1]}`} alt="" 
                                                className='h-[200px]' onClick={()=> setSelect(1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full 800px:w-[50%] pt-5">
                                   <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                   <p className={`${styles.description} mt-6`}>{data.description}</p>
                                   <div className="flex pt-3">
                                        <h4 className={`${styles.productDiscountPrice}`}>{data.discountPrice}$</h4>
                                        <h3 className={`${styles.price}`}>
                                            {data.originalPrice ? data.originalPrice + "$" : data.discountPrice + "$"}
                                        </h3>
                                   </div>
                                   <div className="flex items-center justify-between pr-3 mt-12">
                                    <div>
                                        <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick={decrementCount} >
                                            -
                                        </button>
                                        <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[11px]'>
                                            {count}
                                        </span>
                                        <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick={incrementCount} >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className={`${styles.button} mt-6 rounded h-11  flex items-center`} onClick={()=>handleAddToCart(data._id,data.stock)} >
                                    <span className='text-white flex items-center'>
                                        Add to Cart <AiOutlineShoppingCart className='ml-1'/> 
                                    </span>
                                </div>
                                <div className="flex items-center pt-8">
                                    <Link to={`/shop/${data.shop._id}`}><img src={`${backend_url}//${data.shop.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full mr-2'/></Link>
                                    <div>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data.shop.shopName}
                                        </h3>
                                        {/* <h5 className='pb-3 text-[15px]'>
                                            ({data.shop.ratings}) Ratings
                                        </h5> */}
                                    </div>
                                    <div className={`${styles.button} bg-[#6443d1] mt-4 ml-10 rounded h-11`} >
                                        <button className='text-white flex items-center' onClick={()=> handleMassageSubmit()}>
                                            Send Message <AiOutlineMessage className='ml-1' />
                                        </button> 
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className='min-h[50vh]'>
                                {/* <ProductDetailsInfo data={data} products={products} averageRating={averageRating} totalReviewsLength={totalReviewsLength} /> */}
                            </div>
                        <ProductDetailsInfo data={data} products={products} averageRating={averageRating} totalReviewsLength={totalReviewsLength} />
                          
                        </div>
                        {/* <ProductDetailsInfo data={data} products={products} averageRating={averageRating} totalReviewsLength={totalReviewsLength} /> */}
                        <br />
                        <br />
                        <RelatedProducts data={data}/>
                        <br />
                        <br />
                    </div>
                </>) : null
            }
        </div>
    </>
  )
}

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-10">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative ">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}//uploads//${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5 mb-9">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/${data.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};
export default ProductDetailPage
