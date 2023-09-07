import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { server } from '../../server';
import { Button } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const AllSubscribers = () => {
    const {events,isLoading} = useSelector((state)=>state.events);
    const [subs,setSubs] = useState([])
    const {seller} = useSelector((state)=>state.seller)

    const dispatch = useDispatch();
   useEffect(()=>{
    console.log(subs)
    axios.get(`${server}/subsribe/get-all-subscribers`)
          .then((res) => {
            setSubs(res.data.subs);
          })
          .catch((err) => {
            console.log(err);
          });
   },[dispatch])
    //console.log(products);

    const handleDelete = async(id)=>{
        await axios.delete(`${server}/subscribe/delete-subscriber/${id}`)
          .then((res) => {
            toast.success("Subscriber deleted successfully")
            window.location.reload()
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 170, flex: 0.7 },
        {
          field: "email",
          headerName: "email",
          minWidth: 180,
          flex: 0.6,
        },
        {
            field: "CreatedAt",
            headerName: "Created At",
            minWidth: 80,
            flex: 0.5,
        },
        {
          field: "Delete",
          flex: 0.5,
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
    
      subs &&
      subs.forEach((item) => {
    row.push({
      id: item?._id,
      email: item?.email,
      CreatedAt: item?.createdAt?.slice(0,10),
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

export default AllSubscribers
