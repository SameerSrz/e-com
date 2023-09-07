import React, { useState } from 'react'
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
  } from "react-icons/ai";
  import { Link } from "react-router-dom";
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from '../../Static/Data';
import { backend_url } from '../../server';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../../server';

const Footer = () => {
    const [email,setEmail] = useState("")

    const handleSubscription = async(e)=>{
        e.preventDefault();
        await axios.post(`${server}/create-subscription`,{email}
      ).then((res) => {
       toast.success("Subscribed Successfully");
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    }

  return (
    <>
        <div className="bg-[#000] text-white">
            <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#28559A] py-7 ">
                <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w2/5'>
                    <span className='text-[#000000]'>
                        Subcribe
                    </span> us for latest news <br/> events and offers
                </h1>
                <div>
                    <input type="text" required placeholder='Enter your email' 
                        className='text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <button className='bg-[#000] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full' onClick={handleSubscription}>
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
                <ul className='px-5 text-center sm:text-start flex sm:block flex-col items-center'>
                    <img src={`${backend_url}//uploads//MiniMarg-removebg-preview.png`} alt=""
                    style={{filter: "brightness(0) invert(1)" , width: '200px', height: '150px'}} />
                    <br />
                    <p>Make Money With Us by Selling on MiniMarg </p>
                    <div className="flex items-center mt-[15px]">
                        <AiFillFacebook size={25} className="cursor-pointer" />
                        <AiOutlineTwitter
                        size={25}
                        style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        <AiFillInstagram
                        size={25}
                        style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        <AiFillYoutube
                        size={25}
                        style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                    </div>
                </ul>   
                <ul className="text-center sm:text-start">
                    <h1 className='mb-1 font-semibold '> Company</h1>
                    {
                        footerProductLinks.map((link)=>(
                            <li keys={link.name}>
                                <Link 
                                className="text-gray-400 hover:text-teal-400 duration-300
                                          text-sm cursor-pointer leading-6">
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <ul className="text-center sm:text-start">
                    <h1 className='mb-1 font-semibold '> Shop</h1>
                    {
                        footercompanyLinks.map((link)=>(
                            <li keys={link.name}>
                                <Link to={`/products?category=${link.name}`}
                                className="text-gray-400 hover:text-teal-400 duration-300
                                          text-sm cursor-pointer leading-6">
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <ul className="text-center sm:text-start">
                    <h1 className='mb-1 font-semibold '>Support</h1>
                    {
                        footerSupportLinks.map((link)=>(
                            <li keys={link.name}>
                                <Link to={link.name}
                                className="text-gray-400 hover:text-teal-400 duration-300
                                          text-sm cursor-pointer leading-6">
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
                    <span>© 2020 Becodemy. All rights reserved.</span>
                    <span>Terms · Privacy Policy</span>
                    <div className="sm:block flex items-center justify-center w-full">
                        <img
                            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                            alt=""
                        />
                    </div>
            </div>
        </div>
    </>
  )
}

export default Footer
