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
import { toast } from 'react-toastify';

const AllEvents = () => {
    const {events,isLoading} = useSelector((state)=>state.events);
    const {seller} = useSelector((state)=>state.seller)
    const [allEvents,setAllEvent] = useState([]);
    console.log(allEvents)
    const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getAllEvents(seller?._id))
    axios.get(`${server}/product/get-all-events`).then((res)=>{
      setAllEvent(res.data.events)
    }).catch((err)=>{
      console.log(err);
    })
   },[dispatch])
    //console.log(products);

    const handleDelete = (id)=>{
        console.log(id)
       dispatch(deleteEvent(id));
       toast.success("Event deleted successfully")
       window.location.reload();
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
          field: "price",
          headerName: "Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          minWidth: 80,
          flex: 0.5,
        },
        {
            field: "Start_Date",
            headerName: "Start Date",
            type: "Date",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "End_Date",
            headerName: "End Date",
            type: "Date",
            minWidth: 80,
            flex: 0.5,
        },
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
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
        {
          field: "Delete",
          flex: 0.8,
          minWidth: 120,
          headerName: "Delete",
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
    
      allEvents &&
      allEvents.forEach((item) => {
          row.push({
            id: item?._id,
            name: item?.name,
            price: "US$ " + item?.discountPrice,
            Stock: item?.stock,
            Start_Date: item?.start_Date,
            End_Date: item?.Finish_Date,
            sold: item?.sold_out,
          });
        });

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

export default AllEvents
