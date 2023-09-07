import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts , deleteProduct} from '../../redux/action/product'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { server } from '../../server';

const AllProducts = () => {
    const {isLoading} = useSelector((state)=>state.products);
    const {seller} = useSelector((state)=>state.seller)
    const [products,setProducts] = useState([]);
    const dispatch = useDispatch()

    useEffect(()=>{
        axios
          .get(`${server}/product/get-all-products`)
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
          // dispatch(getAllProducts(seller._id))
    },[dispatch])


    const handleDelete = (id)=>{
        // console.log(id)
       dispatch(deleteProduct(id));
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
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
        {
          field: "Preview",
          flex: 0.8,
          minWidth: 100,
          headerName: "Preview",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/product/${params.id}`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
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
    
      products &&
        products.forEach((item) => {
          row.push({
            id: item?._id,
            name: item?.name,
            price: "US$ " + item?.discountPrice,
            Stock: item?.stock,
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

export default AllProducts
