import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../Static/Data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { createEvent } from '../../redux/action/event'

const CreateEvent = () => {
    const {seller} = useSelector((state)=>state.seller)
    const {isLoading,success,error} = useSelector((state)=>state.events)

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
    const [startDate,setStartDate] = useState();
    const [endDate,setEndDate] = useState();
    const today = new Date().toISOString().slice(0,10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) : today ;

    useEffect(() => {
        if (error) {
          toast.error(error);
        }
        if (success) {
          toast.success("Event created successfully!");
          navigate("/dashboard");
          window.location.reload();
        }
      }, [dispatch, error, success,navigate]);
    
      const handleImageChange = (e) => {
        e.preventDefault();
    
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
      };
      
      const handleStartDate = (e)=>{    
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);
      }

      const handleEndDate = (e)=>{
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
      }
    
      console.log(images);
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
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
        newForm.append("start_Date",startDate);
        newForm.append("Finish_Date",endDate)
        newForm.append("shopId", seller._id);
        dispatch(createEvent(newForm));
        toast.success("event created successfully")
      };

  return (
    <>
        <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className='text-[30px] font-Poppins text-center'>
                Create Event
            </h5>
            {/* Create Event form */}
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
                        placeholder='Enter your event product name ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Description <span className='text-red-500'>*</span>
                    </label>
                    <textarea 
                        cols={30}
                        rows={8}
                        type="text" 
                        name='description' 
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)} 
                        className='mt-2 appearance-none block w-full px-3 h-[125px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your event product description ...'
                    />
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
                        placeholder='Enter your event product tags ...'
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
                        placeholder='Enter your event orignal price ...'
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
                        placeholder='Enter your event discount price ...'
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
                        placeholder='Enter your event stock ...'
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Event Start Date <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="date" 
                        name='date'
                        id='start-date' 
                        value={startDate ? startDate.toISOString().slice(0,10) : ""} 
                        onChange={handleStartDate} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your event stock ...'
                        min={today}
                        />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Event End Date <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="date" 
                        name='date'
                        id='end-date' 
                        value={endDate ? endDate.toISOString().slice(0,10) : ""} 
                        onChange={handleEndDate} 
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Enter your event stock ...'
                        min={minEndDate}
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
                        <input type="submit" value="Create Event" 
                         className='mt-2 appearance-none block w-full px-3 h-[35px] border bg-[#010101] text-[#fff] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        />
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreateEvent
