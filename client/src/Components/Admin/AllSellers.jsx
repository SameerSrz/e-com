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

const AllSellers = () => {
    const { isLoading} = useSelector((state)=>state.orders)
    const [sellers,setSellers] = useState([])
    const {seller} = useSelector((state)=>state.seller)
    const dispatch = useDispatch()

    useEffect(()=>{
        axios
          .get(`${server}/seller/admin-all-sellers`)
          .then((res) => {
            setSellers(res.data.sellers);
          })
          .catch((err) => {
            console.log(err);
          });
          dispatch(getAllSellerOrders(seller?._id))
    },[dispatch])

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
          field: "Number",
          headerName: "Phone Number",
          type: "number",
          minWidth: 130,
          flex: 0.7,
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
        //   {
        //     field: " ",
        //     flex: 1,
        //     minWidth: 150,
        //     headerName: "",
        //     type: "number",
        //     sortable: false,
        //     renderCell: (params) => {
        //       return (
        //         <>
        //           <Link to={`/order-detail/${params.id}`}>
        //             <Button>
        //               <AiOutlineArrowRight size={20} />
        //             </Button>
        //           </Link>
        //         </>
        //       );
        //     },
        //   },
      ];
    
      const row = [];

      sellers && sellers.forEach((item)=>{
            row.push({
                id: item?._id,
                name: item?.name,
                email: item?.email,
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

export default AllSellers
