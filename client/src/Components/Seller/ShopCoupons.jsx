import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts , deleteProduct} from '../../redux/action/product'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import styles from '../../Styles/styles';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';
import { toast } from "react-toastify";

const ShopCoupons = () => {
    const {products} = useSelector((state)=>state.products);
    const {seller} = useSelector((state)=>state.seller)
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
    const [value,setValue] = useState()
    const [selectedProduct,setSelectedProducts] = useState()
    const [coupons,setCoupons] = useState([])
    const [isLoading,setIsLoading] = useState(false);

    const dispatch = useDispatch();
   useEffect(()=>{
    setIsLoading(true)
    axios.get(`${server}/coupons/get-coupons/${seller._id}`,{withCredentials: true}).then((res)=>{
        setIsLoading(false);
        setCoupons(res.data.coupons);
        console.log(res.data.coupons)
    }).catch((err)=>{
        setIsLoading(false);
        toast.error(err);
    })
   },[dispatch])
    const handleDelete = (id)=>{
        axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
            toast.success("Coupon code deleted succesfully!")
          })
          window.location.reload();
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
    await axios.post(`${server}/coupon/create-coupon-code`,
        {
          name,
          selectedProduct,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      ).then((res) => {
       toast.success("Coupon code created successfully!");
       setOpen(false);
       window.location.reload();
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    }

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 170, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "value",
          headerName: "Percentage",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Delete",
          flex: 0.6,
          minWidth: 120,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Button onClick={()=>handleDelete(params.id)}>
                  <AiOutlineDelete size={20} />
                </Button>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      coupons &&
        coupons.forEach((item) => {
            row.push({
                id: item?._id,
                name: item?.name,
                value: item?.value + " %",
              });
        });

  return (
    <>
       {
        isLoading ? (
            <Loader/>
        ) : (
            <div className="w-full mx-8 mt-10 pt-1 bg-white">
                <div className="w-full flex justifu-end">
                    <div className={`${styles.button} !w-max !h-[45px] px-3 mr-3 mb-3`} onClick={()=>setOpen(true)}>
                        <span className='text-white'>
                            Create Coupon Code
                        </span>
                    </div>
                </div>
                <DataGrid rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
                {
                    open && (
                        <div className="fixed top-0 left-0 w-full h-screen z-[20000] bg-[#00000062] flex items-center justify-center">
                            <div className="w-[90%] 800px:w-[50%] h-[60vh] bg-white rounded-md shadow p-4">
                                <div className="w-full flex justify-end">
                                    <RxCross1 size={30} className='cursor-pointer' onClick={()=>setOpen(false)}/>
                                </div>
                                <h5 className='text-[30px] font-Poppins text-center'>
                                    Create Coupon Code
                                </h5>
                                {/* Create Coupon Form */}
                                <form onSubmit={handleSubmit} area-required={true}>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Coupon Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name='name' 
                                            required
                                            value={name} 
                                            onChange={(e)=>setName(e.target.value)} 
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            placeholder='Enter your Coupon name ...'
                                            />
                                    </div>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Discount Percentage <span className='text-red-500'>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name='name' 
                                            required
                                            value={value} 
                                            onChange={(e)=>setValue(e.target.value)} 
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            placeholder='Enter discount percentage ...'
                                            />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Selected Product</label>
                                        <select
                                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                                        value={selectedProduct}
                                        onChange={(e) => setSelectedProducts(e.target.value)}
                                        >
                                        <option value="Choose your selected products">
                                            Choose a selected product
                                        </option>
                                        {products &&
                                            products.map((i) => (
                                            <option value={i.name} key={i.name}>
                                                {i.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <br />
                                    <div>
                                        <input
                                        type="submit"
                                        value="Create Coupon"
                                        className="mt-2 appearance-none block w-full bg-[#fa7e19] px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        )
       }
    </>
  )
}

export default ShopCoupons
