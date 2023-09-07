import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from "react-icons/io5";
import {BsCartPlus} from 'react-icons/bs'    
import styles from '../Styles/styles'
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist} from '../redux/action/wishlist';
import { backend_url } from '../server';
import { toast } from 'react-toastify';
import { addTocart } from '../redux/action/cart';

const Wishlist = ({setWishlist}) => {

    const {wishlist} = useSelector((state)=> state.wishlist)
    const {cart} = useSelector((state)=> state.cart)
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data));
        toast.error("removed from wishlist")
      };
    
      const addToCartHandler = (data) => {
        const newData = {...data, qty:1};
        dispatch(addTocart(newData));
        toast.success("Added to cart")
        setWishlist(false);
      }

    const cartData = [
        {
            name: "Iphone 14 Pro Max",
            description: "test",
            price: 1000,
        },
        {
            name: "Iphone 13 Pro Max",
            description: "test",
            price: 1000,
        },
        {
            name: "Iphone 12 Pro Max",
            description: "test",
            price: 1000,
        },
    ]
  return (
    <>
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className='cursor-pointer'
                        onClick={() => {setWishlist(false)}} />
                    </div>
                    <div className={`${styles.noramlFlex} p-4`}>
                        <AiOutlineHeart size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            {wishlist && wishlist.length} items
                        </h5>
                    </div>
                    {/* Cart Single item */}
                    <br />
                    <div className="w-full border-t">
                        {
                            wishlist && wishlist.map((i,index)=>(
                                <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

const CartSingle = ({data, removeFromWishlistHandler , addToCartHandler}) =>{
    const [value,setValue] = useState(1);
    const totalPrice = data.discountPrice * value;
    return(
        <>
            <div className='border-b p-4'>
                <div className="w-full flex items-center">
                <RxCross1 className='cursor-pointer m-3' size={40} onClick={()=> removeFromWishlistHandler(data)} />
                <img src={`${backend_url}//uploads//${data?.images[0]}`}
                     className='w-[80px] h-[80px] ml-2 '
                     alt="" />
                    
                     <div className="pl-[5px]">
                        <h1>{data.name}</h1>
                        
                        <h4 className='font-[600] text-[17px] mt-1 pt-[3px] text-[#d02222] font-Roboto'>${totalPrice}</h4>
                     </div>
                     <div>
                        <BsCartPlus size={20} className='cursor-pointer ml-10' title='Add to cart' onClick={()=> addToCartHandler(data)}/>
                     </div>
                </div>

            </div>
        </>
    )
}

export default Wishlist
