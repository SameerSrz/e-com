import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/styles'
import {categoriesData } from '../../Static/Data'
import {AiOutlineSearch} from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from "react-icons/cg";
import {IoIosArrowDown, IoIosArrowForward} from 'react-icons/io'
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown, { ProfileDropdown } from "./DropDown"
import Navbar from './Navbar'
import {useSelector} from 'react-redux'
import {backend_url} from '../../server'
import Cart from '../Cart'
import Wishlist from '../Wishlist'
import { RxCross1 } from 'react-icons/rx'
import axios from 'axios'
import { server } from '../../server'
// import { popUps } from '../../Static/Data'
// import { toast } from 'react-toastify'

const Header = ({activeHeading}) => {
    const {isAuthenticated,user} = useSelector((state)=> state.user)
    // const {products} = useSelector((state)=>state.products)
    const {cart} = useSelector((state)=> state.cart)
    const {wishlist} = useSelector((state)=> state.wishlist)
    const [searchTerm,setSearchTerm] = useState("");
    const [cartItem,setCart] = useState(false);
    const [openWishList,setWishlist] = useState(false);
    const [searchData,setSearchData] = useState(null);
    const [active,setActive] = useState(false);
    const [dropDown,setDropDown] = useState(false);
    const [open,setOpen] = useState(false);
    const [data,setData] = useState([]);
    const [profileDropdown,setProfileDropDown] = useState(false)

    useEffect(()=>{
        axios.get(`${server}/product/get-all-products`).then((res)=>{
            setData(res.data.products)
        }).catch((err)=>{
            console.log(err)
        })
        window.scrollTo(0,0);
    },[])
    // console.log(data)

    const handleSearchChange = (e) =>{
        const term = e.target.value;
        setSearchTerm(term);

        const filteredProducts = data && data.filter((product)=>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts);
    }
    window.addEventListener("scroll",()=>{
        if(window.scrollY >70)
        {
            setActive(true);
        }else{
            setActive(false);
        }
    })



  return (
    <>
        <div className={`${styles.section}`}>
            <div className='hidden 800px:h-[50px] 800px:my-[20px]  800px:flex items-center justify-between pb-2'>
                <div>
                    <Link to="/">
                        <img src={`${backend_url}//uploads//MiniMarg-removebg-preview.png`} className='color-[#fa7e19]' style={{ filter: "#fa7e19", color: "#fa7e19",width: '200px', height: '100px', color: "#fa7e19" }} alt='logo' />
                        
                        {/* <img src='https://logos-world.net/wp-content/uploads/2022/05/Daraz-Logo.png' style={{ width: '150px', height: '80px' }} alt='daraz-logo' /> */}
                    </Link>
                </div>
                <div className='w-[50%] relative'>
                    <input type='text'
                     placeholder='Search Product ...' 
                     value={searchTerm} 
                     onChange={handleSearchChange} 
                     className='h-[40px] w-full px-2 border-[#28559A] border-[2px] rounded-md'
                     />
                     <AiOutlineSearch size={30} color='#28559A' className="absolute right-2 top-1.5 cursor-pointer"/>
                     {
                        searchData && searchData.length !==0 ? (
                            <div className='absolute min-h-[30vh] w-full bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                {searchData && searchData.map((i,index)=>{
                                    const d = i._id;
                                    return (    
                                        <Link to={`/product/${d}`}>
                                            <div className="w-full flex items-start-py-3 pt-3">
                                                <img src={`${backend_url}//uploads//${i.images[0]}`} alt="" className='w-[40px] h-[40px] mr-[10px]'/>
                                                <h1>{i.name}</h1>
                                            </div>
                                            
                                        </Link>
                                    )
                                })}
                            </div> 
                        ): null
                     }
                </div>

                <div className={`${styles.button}`}>
                    <Link to="/seller-signup">
                        <h1 className='text-[#fff] flex items-center'> Become a Seller <IoIosArrowForward className="ml-1"/>
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
        <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#28559A] pt-2 h-[70px]`}>
                <div className= {`${styles.section} relative ${styles.noramlFlex} justify-between`} >
                    {/* categories */}
                    <div onClick={()=>setDropDown(!dropDown)}>
                        <div className="relative h-[60px] mt-[4px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className='absolute top-3 left-2'/>
                            <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500]  select-none rounded-t-md`}>
                                Categories
                            </button>
                            <IoIosArrowDown size={20} className='absolute right-2 top-4 cursor-pointer' onClick={()=>setDropDown(!dropDown)} />
                            {dropDown ? (<DropDown categoriesData={categoriesData} setDropDown={setDropDown} data={data}/>
                            ): null }
                            {/* Nav items*/ }
                            {/* <div className={`${styles.noramlFlex}`}>
                                <Navbar active={activeHeading} />
                            </div> */}
                        </div>
                    </div>
                    {/* Nav items*/ }
                    <div className={`${styles.noramlFlex}`}>
                                <Navbar active={activeHeading} />
                    </div>
                    <div className="flex">
                        <div className={`${styles.noramlFlex}`}>
                                <div className="relative cursor-pointer mr-[15px]" onClick={()=>setWishlist(true)}>
                                    <AiOutlineHeart size={30} color='rgb(255 255 255/ 83%)' />
                                    <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center'>
                                        {wishlist && wishlist.length}
                                    </span>
                                </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                                <div className="relative cursor-pointer mr-[15px]" onClick={()=>setCart(true)}>
                                    <AiOutlineShoppingCart size={30} color='rgb(255 255 255/ 83%)' />
                                    <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center'>
                                        {cart && cart.length}
                                    </span>
                                </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                                <div className="relative cursor-pointer mr-[15px]">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="relative h-[60px] mt-[22px] w-[90px] hidden 1000px:block" onClick={()=> profileDropdown ? setProfileDropDown(false) : setProfileDropDown(true)}>
                                                <img src= {`${backend_url}//uploads//${user.avatar}`} className='w-[35px] h-[35px] rounded-full' alt="" />
                                                <div className='pt-3'>
                                                    {profileDropdown ? (<ProfileDropdown setProfileDropDown={setProfileDropDown} user={user}/>) : null}
                                                </div>
                                            </div>
                                            <Link>
                                        {/* <CgProfile size={30} color='rgb(255 255 255/ 53%)' /> */}
                                            {/* <img src= {`${backend_url}//uploads//${user.avatar}`} className='w-[35px] h-[35px] rounded-full' alt="" />
                                            {dropDown ? (<ProfileDropdown setDropDown={setDropDown} user={user}/>) : null} */}
                                            {/* <img src= {filePath} className='w-[35px] h-[35px] rounded-full object-cover border-[3px] border-[#3ad132]' alt='' /> */}
                                         </Link>
                                        </>
                                       
                                    ) : (
                                        <Link to="/login">
                                        <CgProfile size={30} color='rgb(255 255 255/ 83%)' />
                                    </Link>
                                    )
                                    }
                                    {console.log(isAuthenticated)}
                                </div>
                        </div>
                        {/* Show cart popup */}
                        {
                            cartItem ? (<Cart setCart={setCart}/>) : null
                        }
                        {/* Show WishList popup */}
                        {
                            openWishList ? (<Wishlist setWishlist={setWishlist}/>) : null
                        }
                    </div>
                </div>
            </div>
            {/* Mobile Header */}
            <div className="w-full h-[60px] fixed bg-[#fff] z-50 top-0 left-0 shadwo-sm 800px:hidden">
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <BiMenuAltLeft size={40} className='ml-4' onClick={()=>setOpen(true)}/>
                        </div>
                        <div>
                            <Link to='/'>
                                <img src={`${backend_url}//uploads//MiniMarg-removebg-preview.png`} alt="" className=' cursor-pointer w-[100px] h-[60px]' />
                            </Link>
                        </div>
                        <div>
                            <div className="relative mr-[20px]">
                                <AiOutlineShoppingCart size={30}/>
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center'>
                                    {cart && cart.length}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Header sidebar */}
                    {
                        open && (
                            <>
                                <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
                                    <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10">
                                        <div className="w-full justify-between flex pr-3">
                                            <div>
                                                <div className="relative mr-[15px]">
                                                    <AiOutlineHeart size={30} className='mt-5 ml-3' />
                                                    <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center'>
                                                        1
                                                    </span>
                                                </div>
                                            </div>
                                            <RxCross1 size={30} className='ml-4 mt-5' onClick={()=>setOpen(false)} />
                                        </div>
                                        <div className="my-8 w-[92%] mt-3 m-auto h-[40px]">
                                            <input type='text'
                                                placeholder='Search Product ...' 
                                                value={searchTerm} 
                                                onChange={handleSearchChange} 
                                                className='h-[40px] w-full px-2 border-[#28559A] border-[2px] rounded-md'
                                                />
                                                {
                                                        searchData && searchData.length !==0 ? (
                                                            <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                                                {searchData && searchData.map((i,index)=>{
                                                                    const d = i.name;
                                                                    const Product_name = d.replace(/\s+/g,"-");
                                                                    return (    
                                                                        <Link to={`/product/${Product_name}`}>
                                                                            <div className="w-full flex items-start-py-3">
                                                                                <img src={i.image_Url} alt="" className='w-[40px] h-[40px] mr-[10px]'/>
                                                                            </div>
                                                                            <h1>{i.name}</h1>
                                                                        </Link>
                                                                    )
                                                                })}
                                                            </div> 
                                                        ): null
                                                    }
                                        </div>
                                        <div className='mt-5'>
                                             <Navbar active={activeHeading}/>
                                             <div className={`${styles.button} ml-4`}>
                                                <Link to="/seller">
                                                    <h1 className='text-[#fff] flex items-center'> Become a Seller <IoIosArrowForward className="ml-1"/>
                                                    </h1>
                                                </Link>
                                             </div>
                                             <br />
                                             <br />
                                             <br />
                                             <div className="flex w-full justify-center">
                                                {isAuthenticated ? (
                                                <div>
                                                    <Link to="/profile">
                                                    <img
                                                        src={`${backend_url}//uploads//${user?.avatar}`}
                                                        alt=""
                                                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                                                    />
                                                    {/* <img src= 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg' className='w-[70px] h-[70px] rounded-full object-cover border-[3px] border-[#3ad132]' alt='' /> */}
                                                    </Link>
                                                </div>
                                                ) : (
                                                <>
                                                    <Link
                                                    to="/login"
                                                    className="text-[18px] pr-[10px] text-[#000000b7]"
                                                    >
                                                    Login /
                                                    </Link>
                                                    <Link
                                                    to="/signup"
                                                    className="text-[18px] text-[#000000b7]"
                                                    >
                                                    Sign up
                                                    </Link>
                                                </>
                                                )}
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
            </div>
    </>
  )
}

export default Header
