import React, { useEffect, useState } from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import CreateCategory from './CreateCategory'
import { server } from '../../server'
import { toast } from 'react-toastify'
import axios from 'axios'

const CreateCategoryPage = () => {
  const [categories,setCategories] = useState([])
    const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/category/get-all-category`)
      .then((res) => {
        setIsLoading(false);
        setCategories(res.data.Categories);
        console.log(res.data.categories);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message); // Display the error message using toast.error
      });
  }, []);
  return (
    <>
        <AdminDashboardHeader/>
        <div className="flex  jutify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={10}/>
            </div>
            <div className="w-full justify-center flex">
              <CreateCategory categories={categories} isLoading={isLoading} />
            </div>
        </div>
    </>
  )
}

export default CreateCategoryPage
