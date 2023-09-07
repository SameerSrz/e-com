import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllEvents , deleteEvent} from '../../redux/action/event'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { server } from '../../server';

const AllCoupons = () => {
    const {events,isLoading} = useSelector((state)=>state.events);
    const [coupons,setCoupons] = useState([])
    const {seller} = useSelector((state)=>state.seller)
    console.log(events)
    const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getAllEvents(seller?._id))
    axios
          .get(`${server}//coupons/get-all-coupons`)
          .then((res) => {
            setCoupons(res.data.coupons);
          })
          .catch((err) => {
            console.log(err);
          });
   },[dispatch])
    //console.log(products);

    const handleDelete = (id)=>{
        //console.log(id)
    //    dispatch(deleteEvent(id));
    //    window.location.reload();
    }

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 170, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 0.6,
        },
        {
          field: "value",
          headerName: "Percentage",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "shopId",
          headerName: "Shop Id",
          minWidth: 80,
          flex: 0.5,
        },
        {
            field: "ProductName",
            headerName: "Product Name",
            minWidth: 80,
            flex: 0.5,
        },
        // {
        //   field: "sold",
        //   headerName: "Sold out",
        //   type: "number",
        //   minWidth: 130,
        //   flex: 0.6,
        // },
        // {
        //   field: "Preview",
        //   flex: 0.8,
        //   minWidth: 100,
        //   headerName: "Preview",
        //   type: "number",
        //   sortable: false,
        //   renderCell: (params) => {
        //     return (
        //       <>
        //         <Link to={`/product/${params.id}`}>
        //           <Button>
        //             <AiOutlineEye size={20} />
        //           </Button>
        //         </Link>
        //       </>
        //     );
        //   },
        // },
        // {
        //   field: "Delete",
        //   flex: 0.8,
        //   minWidth: 120,
        //   headerName: "Delete",
        //   type: "number",
        //   sortable: false,
        //   renderCell: (params) => {
        //     return (
        //       <>
        //         <Button onClick={()=>handleDelete(params.id)}>
        //           <AiOutlineDelete size={20} />
        //         </Button>
        //       </>
        //     );
        //   },
        // },
      ];
    
      const row = [];
    
      coupons &&
  coupons.forEach((item) => {
    row.push({
      id: item?._id,
      name: item?.name,
      value: item?.value + " %",
      shopId: item?.shopId,
      ProductName: item?.selectedProduct,
    });
  });
  console.log(coupons)

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

export default AllCoupons
