import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
// import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../Styles/styles";
import { toast } from "react-toastify"

const AdminWithdrawl = () => {
    const [data,setData] = useState([])
    const [open,setopen] = useState(false)
    const [withdrawData,setWithdrawData] = useState()
    const [withdrawStatus,setWithdrawStatus] = useState('Processing')

    useEffect(()=>{
        axios.get(`${server}/withdrawl/get-all-withdraw-request`).then((res)=>{
            setData(res.data.withdrawls)
        }).catch((err)=>{
            console.log(err)
        })
    },[setData])
    // console.log(withdrawData)
    const handleSubmit = async()=>{
      console.log(withdrawData)
        axios.put(`${server}/update-withdraw-request/${withdrawData.id}`,{sellerId : withdrawData.shopId,},
        {withCredentials: true}).then((res)=>{
            setData(res.data.withdraw);
            toast.success("withrawl request updated successfully");
            setopen(false);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleClick = (params)=>{
      setWithdrawData(params)
      // console.log(withdrawData)
    }

    const columns = [
        { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Shop Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "shopId",
          headerName: "Shop Id",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "amount",
          headerName: "Amount",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "status",
          headerName: "status",
          type: "text",
          minWidth: 80,
          flex: 0.5,
        },
        {
          field: "createdAt",
          headerName: "Request given at",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
        {
          field: " ",
          headerName: "Update Status",
          type: "number",
          minWidth: 130,
          flex: 0.6,
          renderCell: (params) => {
    
            return (
              <BsPencil
                size={20}
                className={`${params.row.status !== "Processing" ? 'hidden' : '' } mr-5 cursor-pointer`}
                onClick={() => {
                  handleClick(params.row)
                  setopen(true);
                }}

              />
            );
          },
        },
      ];

      const row = [];

        data &&
            data?.forEach((item) => {
            row.push({
                id: item?._id,
                shopId: item?.seller._id,
                name: item?.seller.shopName,
                amount: "US$ " + item?.amount,
                status: item?.status,
                createdAt: item?.createdAt.slice(0, 10),
            });
        });


  return (
    <>
        <div className="w-full flex  pt-5 justify-center">
            <div className="w-[95%] bg-white">
                <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                />
            </div>
            {open && (
                <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
                <div className="w-[50%] min-h-[40vh]  bg-white rounded shadow p-4">
                    <div className="flex justify-end w-full cursor-pointer">
                    <RxCross1 size={25} onClick={() => setopen(false)} />
                    </div>
                    <h1 className="text-[25px] text-center font-Poppins font-semibold">
                    Update Withdraw status
                    </h1>
                    <br />
                    <div className="flex justify-center items-center flex-col pt-5">
                    <select
                    name=""
                    id=""
                    onChange={(e) => setWithdrawStatus(e.target.value)}
                    className="w-[200px] h-[35px] flex items-center justify-center  border rounded"
                    >
                    <option value={withdrawStatus}>{withdrawData?.status}</option>
                    <option value={withdrawStatus}>Succeed</option>
                    </select>
                    <button
                    type="submit"
                    className={`block ${styles.button} !bg-[#28559A] text-white !h-[42px] mt-4 text-[18px]`}
                    onClick={handleSubmit}
                    >
                    Update
                    </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    </>
  )
}

export default AdminWithdrawl
