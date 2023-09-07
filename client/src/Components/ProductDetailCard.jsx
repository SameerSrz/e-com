import React, { useState } from 'react'
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
  import { RxCross1 } from "react-icons/rx";
  import styles from '../Styles/styles';
import { backend_url } from '../server';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, addTocart } from '../redux/action/cart';
import { addToWishlist, removeFromWishlist } from '../redux/action/wishlist'
import { Link } from 'react-router-dom';



const ProductDetailCard = ({setOpen,data}) => {
    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const {cart} = useSelector((state)=> state.cart)
    //const [select,setSlect] = useState(false);
    const dispatch = useDispatch();
    const decrementCount = () =>{
        if(count > 1){
            setCount(count - 1);
            }        
    }
    const incrementCount = () =>{
        setCount(count + 1);
    }

    const HandleWishList = (data)=>{
        dispatch(addToWishlist(data))
        setClick(!click)
        toast.success("added to wishlist");
    }
    const HandleRemoveFromWishList = (data)=>{
        dispatch(removeFromWishlist(data))
        setClick(!click)
        toast.error("removed from wishlist");
    }

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
    const handleMassageSubmit = ()=>{
        window.open(`https://wa.me/92${data.shop.phoneNumber}`)

    }

  return (
    <>
        <div className="bg-white">
            {
                data ? (
                    <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                        <div className='w-[90] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
                            <RxCross1 size={30} className='absolute right-3 top-3 z-50 ' 
                            onClick={() => setOpen(false)} />
                            <div className="block w-full 800px:flex">
                                <div className="w-full 800px:w-[50%]">
                                    <img src={`${backend_url}//uploads//${data?.images[0]}`} alt='' />
                                    <div className="flex">
                                         <Link to={`/shop/${data.shop._id}`}>
                                        <img src={`${backend_url}//${data.shop.avatar}`} alt="" 
                                            className='w-[50px] h-[50px] rounded-full mr-2'
                                        /></Link>
                                        <div>
                                            <h3 className={`${styles.shop_name}`}>
                                                {data.shop.shopName}
                                            </h3>
                                            <h5 className='pb-3 text-[15px]'>
                                                ({data.shop.ratings}) Ratings
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <div className={`${styles.button} bg-black mt-4 rounded-[5px] h-11`} 
                                          onClick={handleMassageSubmit}>
                                            <span className='flex text-white items-center' onClick={()=> handleMassageSubmit()}>
                                                Send Message <AiOutlineMessage className='ml-1' />
                                            </span>
                                        </div>
                                        <h5 className='text-[16px] text-[red] mt-5'>
                                            ({data.total_sell}) sold out
                                        </h5>
                                </div>
                                <div className="w-full 800px:w-[50%] pt-5 pl-[5px]  pr-[5px]">
                                    <h1 className={`${styles.productTitle}`}>
                                        {data.name}
                                    </h1>
                                    <p> {data.description} </p>
                                    <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data.discount_price}$
                                    </h4>
                                    <h3 className={`${styles.price}`}> {data.price ? data.price + "$" : null} </h3>
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
                                    <div>
                                    {
                                        click ? (<AiFillHeart size={30} 
                                            className='cursor-pointer ml-20'
                                            onClick={()=>HandleRemoveFromWishList(data)}
                                            color={click ? "red" : "#333"}
                                            title='Remove from WishList'
                                        />) : (
                                            <AiOutlineHeart 
                                                size={30}
                                                className='cursor-pointer ml-20'
                                                onClick={()=>HandleWishList(data)}
                                                color={click ? "red" : "#333"}
                                                title='Add to WishList'
                                            />
                                        )
                                    }
                                    </div>
                                </div>
                                </div>
                                <div
                                    className={`${styles.button} mt-6 rounded-[5px] h-11 flex items-center`}
                                    onClick={()=> handleAddToCart(data._id,data.stock)}
                                    >
                                    <span className="text-[#fff] flex items-center">
                                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                                    </span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </div>
    </>
  )
}

export default ProductDetailCard
