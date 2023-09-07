import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getAllSellerOrders } from '../../redux/action/order';
import axios from 'axios';
import { server } from '../../server';
import { BsPersonAdd } from 'react-icons/bs';
import { toast } from 'react-toastify';

const AllSellerRequest = () => {
    const { isLoading} = useSelector((state)=>state.orders)
    const [sellers,setSellers] = useState([])
    // const {seller} = useSelector((state)=>state.seller)
    const dispatch = useDispatch()
    const [sellerInfo,setSellerInfo] = useState()
    // console.log(sellerInfo)
    useEffect(()=>{
        axios
          .get(`${server}/seller/admin-all-sellers-requests`)
          .then((res) => {
            setSellers(res.data.sellers);
          })
          .catch((err) => {
            console.log(err);
          });
        //   dispatch(getAllSellerOrders(seller._id))
    },[dispatch])

    const handleAcceptRequest = (id)=>{
        axios.get(`${server}/seller/get-seller-info/${id}`)
          .then((res) => {
            setSellerInfo(res.data.seller);
          })
          .catch((err) => {
            console.log(err);
          });
          const config = {headers:{"content-type":"multipart/form-data"}}
          const newForm = new FormData();
            newForm.append("file",sellerInfo?.avatar);
            newForm.append("name",sellerInfo?.name);
            newForm.append("shopName",sellerInfo?.shopName);
            newForm.append("phoneNumber",sellerInfo?.phoneNumber);
            newForm.append("address",sellerInfo?.address);
            newForm.append("zipCode",sellerInfo?.zipCode)
            newForm.append("email",sellerInfo?.email);
            newForm.append("password",sellerInfo?.password);
            newForm.append("confirmPassword",sellerInfo?.confirmPassword            );
            newForm.append("category",sellerInfo?.category);
          axios.post(`${server}/seller/create-shop`,sellerInfo,config).then((res)=>{
            if(res.data.success === true)
            {
              toast.success("Activation email has been sent to seller");
            }
            console.log(res.data.message);
          }).catch((err)=>{
            console.log(err.response.data.message);
            toast.error(err.response.data.message);
          })
    }
    

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 100, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 100,
          flex: 0.7,
        },
        {
          field: "email",
          headerName: "email",
          minWidth: 60,
          flex: 0.6,
        },
        {
            field: "Category",
            headerName: "Category",
            minWidth: 60,
            flex: 0.6,
          },
        {
          field: "Number",
          headerName: "Phone Number",
          type: "number",
          minWidth: 60,
          flex: 0.6,
        },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     minWidth: 130,
        //     flex: 0.7,
        //     cellClassName: (params) => {
        //       return params.status === "Delivered" ? "greenColor" : "redColor";
        //     },
        //   },
          {
            field: "",
            flex: 0.6,
            minWidth: 60,
            headerName: "Accept Request",
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <>
                  <div onClick={()=> handleAcceptRequest(params.id)}>
                 {/* { console.log(params)} */}
                    <Button>
                      <BsPersonAdd size={30} />
                    </Button>
                  </div>
                </>
              );
            },
          },
      ];
    
      const row = [];

      sellers && sellers.forEach((item)=>{
            row.push({
                id: item?._id,
                name: item?.name,
                email: item?.email,
                Category: item?.category,
                Number: item?.phoneNumber,                
            });
          })

  return (
    <>
        {
            isLoading ? (
            <Loader/>
        ) : (
            <div className="w-full mx-8 mt-10 pt-1 bg-white">
                <DataGrid rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
            </div>
        )
       }
    </>
  )
}

export default AllSellerRequest
