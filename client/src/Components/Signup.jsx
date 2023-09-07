import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import axios from "axios"
import { server } from '../server';
import { toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");
    const [name,setName] = useState("");
    const [confirmPassword,setConfirmPass] = useState("");
    const [avatar, setAvatar] = useState(null);

    const validatePassword = (password) => {
      // Define a regular expression pattern for the password
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
      
      // Check if the password matches the pattern
      return passwordRegex.test(password);
    };

    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      setAvatar(file);
      // const formData = new FormData();
      // formData.append('image', file);
    }
    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(password !== confirmPassword)
      {
        toast.error("Passwords do not match")
      }
      else if(!validatePassword(password) || !validatePassword(confirmPassword))
      {
        toast.error("please enter password in requested format")
      }
      else{const config = {headers:{"content-type":"multipart/form-data"}}
      const newForm = new FormData();
      newForm.append("file",avatar);
      newForm.append("name",name);
      newForm.append("email",email);
      newForm.append("password",password);
      newForm.append("confirmPassword",confirmPassword);

      axios.post(`${server}/user/create-user`,newForm,config).then((res)=>{
        if(res.data.success === true)
        {
          toast.success(res.data.message);
          navigate("/login");
        }
        console.log(res.data.message);
      }).catch((err)=>{
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      })}
    }

  return (
    <>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}

                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e)=>{setPass(e.target.value)}}
                    // pattern='/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/'
                />
                {validatePassword(password) ? null : (
                  <p class="text-red-500 text-xs italic">Password should be minimum lenght of 8 and must contain 1 capital letter, 1 number and 1 symbol.</p>
                )}
            
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPass(e.target.value)}}
                    // pattern='/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/'
                />
                {validatePassword(confirmPassword) ? null : (
                  <p class="text-red-500 text-xs italic">Password should be minimum lenght of 8 and must contain 1 capital letter, 1 number and 1 symbol.</p>
                )}
              </div>
            </div>
            
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
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
                    name="avatar"
                    id="file-input"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <NavLink to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login to an existing account
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup
