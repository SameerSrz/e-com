import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/styles'
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai'
import ProductDetailCard from "../ProductDetailCard"
import { backend_url } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../redux/action/wishlist'
import { toast } from 'react-toastify'
import Ratings from '../Ratings'

const ProductCard = ({data, isEvent}) => {
    const {wishlist} = useSelector((state)=> state.wishlist)
    const dispatch = useDispatch();
    const [click,setClick] = useState(false);
    const [open,setOpen] = useState(false)
    console.log(data)
    const d = data.name;
    const Product_name = d.replace(/\s+/g,"-")

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

  return (
    <>
        <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3  relative cursor-pointer'>
            <div className="flex justify-end">

            </div>
            <Link to={`/product/${data._id}`}>
                <img src={`${backend_url}//uploads//${data?.images[0]}`} alt="" className='w-full h-[170px] object-contain'/>
            </Link>
            <Link to={`/shop/${data.shopId}`}>
                <h5 className={`${styles.shop_name}`}>{data.shop.shopName}</h5>
            </Link>
            <Link to={`/product/${data._id}`}>
                <h4 className='pb-3 font-[500]'>
                    {data.name.length > 40 ? data.name.slice(0,40) + "..." : data.name}
                </h4>
            </Link>
            <div className="flex">
                <Ratings rating={data?.ratings}/>
                </div>
                <div className="py-2 flex items-center justify-between">
                    <div className="flex">
                        <h5 className={`${styles.productDiscountPrice}`}>
                            {data.originalPrice===0 
                                ? data.originalPrice : data.discountPrice
                            }
                            $
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {data.price?data.price + "$" : null}
                        </h4>
                    </div>
                    <span className='font-[400] text-[17px] text-[#68d284]'>
                        {data.sold_out} sold
                    </span>
                </div>
                {/* side options */}
                <div>
                    {
                        click ? (<AiFillHeart size={22} 
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={()=>HandleRemoveFromWishList(data)}
                            color={click ? "red" : "#333"}
                            title='Remove from WishList'
                        />) : (
                            <AiOutlineHeart 
                                size={22}
                                className='cursor-pointer absolute right-2 top-5'
                                onClick={()=>HandleWishList(data)}
                                color={click ? "red" : "#333"}
                                title='Add to WishList'
                            />
                        )
                    }
                    <AiOutlineEye 
                                size={22}
                                className='cursor-pointer absolute right-2 top-14'
                                onClick={()=>setOpen(!open)}
                                color="#333"
                                title='Open View'
                            />
                            <AiOutlineShoppingCart 
                                size={25}
                                className='cursor-pointer absolute right-2 top-24'
                                onClick={()=>setOpen(!open)}
                                color={click ? "#444" : "#444"}
                                title='Add to cart'
                            />
                            { open ? <ProductDetailCard setOpen={setOpen} data={data} /> : null}
                </div>
        </div>
    </>
  )
}

export default ProductCard
