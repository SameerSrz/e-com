import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../Styles/styles'
import { AiOutlineLogout } from 'react-icons/ai';
import axios from 'axios';
import { server , backend_url } from '../../server';
import { toast } from 'react-toastify';

const DropDown = ({categoriesData,setDropDown,data}) => {
    const navigate = useNavigate();
  const [categories,setCategories] = useState([])
  useEffect(() => {
    
    axios
      .get(`${server}/category/get-all-category`)
      .then((res) => {
        setCategories(res.data.Categories);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

    
    const submitHandle = (i)=>{
        console.log(i)
        navigate(`/products?category=${i.title}`);
        setDropDown(false);
        // window.location.reload();
    }

  return (
    <>
        <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categories &&
        categories.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={`${backend_url}//${i.image}`}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
    </>
  )
}

export const ProfileDropdown = ({setProfileDropDown , user})=>{
    const Navigate = useNavigate()

    const logoutHandler = () =>{
        console.log("here")
        axios.get(`${server}/user/logout`,{withCredentials: true}).then((res)=>{
            toast.success(res.data.message);
            setProfileDropDown(false)
            window.location.reload(true);
            Navigate("/login");
        }).catch((err=>{
            toast.error(err.response.data.message);
        }))
    }
    return(
        <>
            <div className=' mr-[50px] pb-4 w-[140px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm'>
               <div className='flex cursor-pointer w-full mb-8 mt-4 ml-8'> 
                    <Link to="/profile">
                        {/* <img src={`${backend_url}//uploads//${user.avatar}`} alt="" className="w-[30px] h-[30px] rounded-full border-[3px] border-[#0eae88]"/> */}
                        <h5 className={`pl-3  800px:block hidden`}>Profile</h5>
                    </Link>
                </div>
                <div className='flex items-center cursor-pointer ml-4 w-full mb-8' onClick={logoutHandler}>
                    <AiOutlineLogout size={20} />
                    <span className={`pl-3  800px:block hidden`}
                    >LogOut</span>
                 </div>
            </div>
        </>
    )
}

export default DropDown

