import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts , deleteProduct} from '../../redux/action/product'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import styles from '../../Styles/styles';
import { RxAvatar, RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';
import { toast } from "react-toastify";

const CreateCategory = ({categories,isLoading}) => {
    // const {products} = useSelector((state)=>state.products);
    // const {seller} = useSelector((state)=>state.seller)
    const [open,setOpen] = useState(false)
    const [title,setTitle] = useState("")
    const [image,setImage] = useState("")
    // const [value,setValue] = useState()
    // const [selectedProduct,setSelectedProducts] = useState()
    // const [categories,setCategories] = useState([])
    // const [isLoading,setIsLoading] = useState(false);

    // const dispatch = useDispatch();

//    useEffect(() => {
//   setIsLoading(true);
//   axios
//     .get(`${server}/category/get-all-category`)
//     .then((res) => {
//       setIsLoading(false);
//       setCategories(res.data.categories);
//       console.log(res.data.categories);
//     })
//     .catch((err) => {
//       setIsLoading(false);
//       toast.error(err.message); // Display the error message using toast.error
//     });
// }, []); // Remove the dependency array if you don't have any specific dependencies

    const handleDelete = (id)=>{
      axios.put(`${server}/category/delete-category/${id}`).then((res)=>{
        toast.success("Deleted Successfully")
        window.location.reload();
      }).catch((err)=>{
        console.log(err)
      })
        // axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
        //     toast.success("Coupon code deleted succesfully!")
        //   })
        //   window.location.reload();
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setImage(file);
        // const formData = new FormData();
        // formData.append('image', file);
      }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newForm = new FormData();
        newForm.append("file", image);
        newForm.append("title", title);

        await axios.post(`${server}/create-category`, newForm).then((res) => {
        toast.success("Category created successfully!");
        setOpen(false);
        window.location.reload();
        }).catch((error) => {
        toast.error(error.response.data.message);
        });
    }

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 170, flex: 0.7 },
        {
          field: "title",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "createdAt",
          headerName: "Created At",
          minWidth: 100,
          flex: 0.6,
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
    
      categories &&
      categories.forEach((item) => {
            row.push({
                id: item?._id,
                title: item?.title,
                createdAt: item?.createdAt.slice(0,10)               
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
                            Create Category 
                        </span>
                    </div>
                </div>
                <DataGrid rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
                {
                    open && (
                        <div className="fixed top-0 left-0 w-full h-screen z-[20000] bg-[#00000062] flex items-center justify-center">
                            <div className="w-[90%] 800px:w-[50%] h-[40vh] bg-white rounded-md shadow p-4">
                                <div className="w-full flex justify-end">
                                    <RxCross1 size={30} className='cursor-pointer' onClick={()=>setOpen(false)}/>
                                </div>
                                <h5 className='text-[30px] font-Poppins text-center'>
                                    Create Category
                                </h5>
                                {/* Create Category Form */}
                                <form onSubmit={handleSubmit} area-required={true}>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Category Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name='name' 
                                            required
                                            value={title} 
                                            onChange={(e)=>setTitle(e.target.value)} 
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            placeholder='Enter your Category name ...'
                                            />
                                    </div>
                                    <br />
                                    <div>
                                        <label
                                            htmlFor="avatar"
                                            className="block text-sm font-medium text-gray-700"
                                        ></label>
                                        <div className="mt-2 flex items-center">
                                            <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                            {image ? (
                                                <img
                                                src={URL.createObjectURL(image)}
                                                alt="image"
                                                className="h-full w-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <RxAvatar className="h-8 w-8" />
                                            )}
                                            </span>
                                            <label
                                            htmlFor="file-input"
                                            className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                name="image"
                                                id="file-input"
                                                onChange={handleImageUpload}
                                                className="sr-only"
                                                required
                                            />
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <br />
                                    <div>
                                        <input
                                        type="submit"
                                        value="Create"
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

export default CreateCategory
