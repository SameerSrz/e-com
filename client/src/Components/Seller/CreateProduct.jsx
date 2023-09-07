import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../Static/Data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { createProduct } from '../../redux/action/product'

const CreateProduct = () => {
    const {seller} = useSelector((state)=>state.seller)
    const {isLoading,success,error} = useSelector((state)=>state.products)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images,setImages] = useState([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [tags,setTags] = useState("");
    const [orignalPrice,setOrignalPrice] = useState();
    const [discountPrice,setDiscountPrice] = useState()
    const [stock,setStock] = useState();

    useEffect(() => {
        if (error) {
          toast.error(error);
        }
        if (success) {
          toast.success("Product created successfully!");
          navigate("/dashboard");
          window.location.reload();
        }
      }, [dispatch, error, success,navigate]);
    
      const handleImageChange = (e) => {
        e.preventDefault();
    
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
      };
    
      console.log(images);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(stock === 0 || stock < 0)
        {
            toast.error("Stock cannot be 0 or less than 0")
        }else{

        const newForm = new FormData();
    
        images.forEach((image) => {
          newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", orignalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", seller._id);
        dispatch(createProduct(newForm));
    }
      };

  return (
    <>
        <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className='text-[30px] font-Poppins text-center'>
                Create Product
            </h5>
            {/* Create Product form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className='pb-2'>
                        Name <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="text" 
                        name='name' 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your product name ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Description <span className='text-red-500'>*</span>
                    </label>
                    <textarea 
                        cols='30'
                        rows='8'
                        type="text" 
                        name='description' 
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[125px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your product description ...'>
                    </textarea>
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Category <span className='text-red-500'>*</span>
                    </label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px]'
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    >
                        <option value="Choose a Category">Choose a Category</option>
                        {
                            categoriesData && categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>{i.title}</option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Tags <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="text" 
                        name='tags' 
                        value={tags} 
                        onChange={(e)=>setTags(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your product tags ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Orignal Price 
                    </label>
                    <input 
                        type="number" 
                        name='price' 
                        value={orignalPrice} 
                        onChange={(e)=>setOrignalPrice(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your orignal price ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Price (Discount Price) <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="number" 
                        name='discountPrice' 
                        value={discountPrice} 
                        onChange={(e)=>setDiscountPrice(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your discount price ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Product Stock <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="number" 
                        name='stock' 
                        value={stock} 
                        onChange={(e)=>setStock(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your stock ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                       Upload Images <span className='text-red-500'>*</span>
                    </label>
                    <input type="file"
                    name=''
                    id='upload'
                    className='hidden'
                    multiple
                    onChange={handleImageChange} />
                    <br />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className='mt-3 cursor-pointer' color='#555'/>
                        </label>
                        {
                            images && images.map((i)=>(
                                <img src={URL.createObjectURL(i)} key={i} alt=""
                                className='h-[120px] w-[120px] object-cover m-2' />
                            ))
                        }
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Create Product" 
                         className='mt-2 appearance-none block w-full px-3 h-[35px] border bg-[#000000] text-[#fff] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        />
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreateProduct
