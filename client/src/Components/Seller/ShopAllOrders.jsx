import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getAllSellerOrders } from '../../redux/action/order';

const ShopAllOrders = () => {
    const {orders, isLoading} = useSelector((state)=>state.orders)
    const {seller} = useSelector((state)=>state.seller)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllSellerOrders(seller._id))
    },[dispatch])
    const handleDelete = (id)=>{
        //console.log(id)
    //    dispatch(deleteProduct(id));
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
          field: "Quantity",
          headerName: "Quantity",
          type: "number",
          minWidth: 130,
          flex: 0.5,
        },
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
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <>
                  <Link to={`/order-detail/${params.id}`}>
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

      orders.forEach((item) => {
        item.cart.forEach((product) => {
          row.push({
            id: item._id,
            name: product.name,
            price: "US$ " + product.discountPrice,
            Quantity: product.qty,
            status: item.status,
          });
        });
      });
        // orders && orders.forEach((item)=>{
        //     row.push({
        //         id: item._id,
        //         name: item.cart.name,
        //         Quantity: item.cart.length,
        //         price: "US$" + item.totalPrice,
        //         status: item.status,
        //     });
        //   })
        console.log(orders)
    //   const [isloading,setLoading] = useState(false);
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

export default ShopAllOrders
