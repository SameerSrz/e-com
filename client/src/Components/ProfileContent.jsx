import React, { useEffect, useState } from 'react'
import {backend_url} from '../server'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import styles from '../Styles/styles'
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { MdOutlineTrackChanges } from 'react-icons/md'
import { updatUserAddress, updateUserInformation } from '../redux/action/user'
import { getAllOrders } from '../redux/action/order'

const ProfileContent = ({active}) => {
    const {user} = useSelector((state)=>state.user);
    const [name,setName] = useState(user && user?.name);
    const [email,setEmail] = useState(user && user?.email);
    const [phoneNumber,setNumber] = useState(user && user?.phoneNumber);
    const [zipCode,setZipCode] = useState(user && user?.addresses[0]?.zipCode);
    const [address1,setAddress1] = useState(user && user?.addresses[0]?.address1);
    const [address2,setAddressTwo] = useState(user && user?.addresses[0]?.address2);
    const [city,setCity] = useState(user && user?.addresses[0]?.city)
    const [country,setCountry] = useState(user && user?.addresses[0]?.country);
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(phoneNumber)
        dispatch(updateUserInformation(name, email, phoneNumber))
        dispatch(updatUserAddress(country, city, address1, address2, zipCode))
    }
    // console.log(orders)

  return (
    <>
          {/* Profile */}
        <div className="w-full ">
            {
                active === 1 && (
                    <>
                        <div className="flex justify-center w-full">
                            <div className="relative">
                                <img src= {`${backend_url}//uploads//${user.avatar}`} className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
                                alt="" />
                                {/* <img src= 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg' className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]' */}
                                {/* alt="" /> */}
                                <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                    <AiOutlineCamera />
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full px-5">
                                <form onSubmit={handleSubmit} aria-required={true}>
                                    <div className="w-full 800px:flex block pb-3">
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'> Full Name</label>
                                            <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e)=>setName(e.target.value)}/>
                                        </div>
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'> Email</label>
                                            <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="w-full 800px:flex block  pb-3">
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'> Phone Number</label>
                                            <input type='number' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}  value={phoneNumber} onChange={(e)=>setNumber(e.target.value)}/>
                                        </div>
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'>Zip Code</label>
                                            <input type='number' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}  value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="w-full 800px:flex block  pb-3">
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'>Address 1</label>
                                            <input type='address' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}  value={address1} onChange={(e)=>setAddress1(e.target.value)}/>
                                        </div>
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'>Address 2</label>
                                            <input type='address' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}  value={address2} onChange={(e)=>setAddressTwo(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="w-full 800px:flex block  pb-3">
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'>City</label>
                                            <input type='address' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}  value={city} onChange={(e)=>setCity(e.target.value)}/>
                                        </div>
                                        <div className="w-[100%] 800px:w-[50%] ">
                                            <label className='block pb-2'>Country</label>
                                            <input type='address' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}  value={country} onChange={(e)=>setCountry(e.target.value)}/>
                                        </div>
                                    </div>
                                    <input
                                            className={`w-[250px] h-[40px] border-[2px] border-[#fa7e19] text-center text-[#fa7e19] rounded-[3px] mt-8 cursor-pointer`}
                                            required
                                            value="Update"
                                            type="submit"
                                        />
                                </form>
                        </div>
                    </>
                )
            }

            {/* Order Page */}
            {
                active ===2 && (
                    <>
                        <AllOrders/>
                    </>
                )
            }

            {/* Refund Page */}
            {
                active === 3 && (
                    <>
                        <AllRefundOrders/>
                    </>
                )
            }

            {/* Inbox Page */}
            {
                active === 4 && (
                    <>
                        
                    </>
                )
            }

            {/* Track Order Page */}
            {
                active === 5 && (
                    <>
                        <TrackOrder/>
                    </>
                )
            }
            {/*  Payment Method Page */}
            {
                active === 6 && (
                    <>
                        <PaymentMethod/>
                    </>
                )
            }
            {/*  LogOut Page */}
            {
                active === 8 && (
                    <>
                        
                    </>
                )
            }
        </div>
    </>
  )
}

const AllOrders = () =>{

    const {orders} = useSelector((state)=>state.orders)
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllOrders(user._id))
    },[])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.status === "Delivered" ? "greenColor" : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row = [];
      orders && orders.forEach((item)=>{
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "US$" + item.totalPrice,
            status: item.status,
        });
      })

    return (
        <>
            <div className="pl-8 pt-1">
                <DataGrid rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
            </div>
        </>
    )
}

const AllRefundOrders = () =>{
    const {orders} = useSelector((state)=>state.orders)
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllOrders(user._id))
    },[])
    console.log(orders)
    // const filteredOrders = orders && orders.filter((item) => item.status === "processing refund");
    //   console.log(filteredOrders)
    // const orders = [
    //     {
    //         _id: "8723yr72y7dy3928d20",
    //         orderItems: [
    //             {
    //                 name: "iphone 14 pro max",
    //             }
    //         ],
    //         totalPrice : 120,
    //         orderStatus : "Processing",
    //     }
    // ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.status === "Delivered" ? "greenColor" : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
      const filteredOrders = orders && orders.filter((item) => item.status === "Processing refund");

      console.log(filteredOrders)
      const row = [];
      filteredOrders && filteredOrders.forEach((item)=>{
        row.push({
            id: item?._id,
            itemsQty: item?.cart.length,
            total: "US$" + item?.totalPrice,
            status: item?.status,
        });
      })
    return (
        <>
            <div className="pl-8 pt-1">
                <DataGrid rows={row} columns={columns} pageSize={10} autoHeight disableRowSelectionOnClick />
            </div>
        </>
    )
}

const TrackOrder = () =>{
    const {orders} = useSelector((state)=>state.orders)
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllOrders(user._id))
    },[])
    // const orders = [
    //     {
    //         _id: "8723yr72y7dy3928d20",
    //         orderItems: [
    //             {
    //                 name: "iphone 14 pro max",
    //             }
    //         ],
    //         totalPrice : 120,
    //         orderStatus : "Processing",
    //     }
    // ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.status === "Delivered" ? "greenColor" : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
        {
            field: "",
            flex: 1,
            minWidth: 130,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) =>{
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <MdOutlineTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }
    ]

    const row = [];
    orders && orders.forEach((item)=>{
        row.push({
            id: item?._id,
            itemsQty: item?.cart.length,
            total: "US$" + item?.totalPrice,
            status: item?.status,
        });
      })

    return(
        <>
            <div className="pl-8 pt-1">
                <DataGrid rows={row} columns={columns} pageSize={10} autoHeight disableRowSelectionOnClick />
            </div>
        </>
    )
}

const PaymentMethod = () =>{
    return(
        <>
            <div className="w-full px-5">
                <div className="flex w-full items-center justify-between">
                    <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                    Payments Method</h1>
                    <div className={`${styles.button} rounded-md`}>
                        <span className='text-[#fff] '>Add New</span>
                    </div>
                </div>
                <br />
                <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                    <div className="flex items-center">
                        <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
                        <h5 className='pl-5 font-[600]'>Sameer Riaz</h5>
                    </div>
                    <div className="flex pl-8 items-center">
                        <h6>1234 **** **** ****</h6>
                        <h5 className='pl-6'> 08/24</h5>
                    </div>
                    <div className="min-w-[10%] flex items-center justify-between pl-8">
                        <AiOutlineDelete size={25} className='cursor-pointer'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileContent
