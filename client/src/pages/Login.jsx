import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import { useAuth } from '../../context/Auth';

const Login = () => {
  const Navigate=useNavigate()
  // const {fetchitems}=useAuth()
  const [user,setUser]=useState({
    email:"",
    password:""
  })

  const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setUser({
      ...user,
      [name]:value,
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const response=await fetch(`https://buyit-backend.onrender.com/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials: "include", // important if using cookies
        body:JSON.stringify(user)
      })
      if(response.ok){
        setUser({ email:"", password:"" });
      
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
        });
      
        setTimeout(() => {
          Navigate("/");
          window.location.reload()
        }, 1500);
      }else{
        toast.error('Invalid Details', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
      }
      
    } catch (error) {
      console.error("login error",error)
    }
  }
  return (
    <>
     <>
    <div className='bg-black w-full h-screen flex justify-center items-center'>
      <NavLink to='/'><h1 className='relative bottom-80 right-96 bg-lime-500 rounded-4xl p-2'>Back to Home</h1></NavLink>
        <div className='bg-lime-300 w-96  rounded-3xl'>
              <h1 className='text-center text-3xl m-7 ml-33 mr-33 cursor-pointer font-bold bg-lime-500  rounded-tr-3xl p-2 rounded-bl-3xl'>BuyIt</h1>
            <div className='text-center'>
              <form onSubmit={handleSubmit} className='grid grid-cols-1 m-8 '>
                <input  onChange={handleInput} value={user.email} className='text-4xl rounded-3xl p-2 bg-white m-2 w-72' type="email" placeholder='email' name='email' />
                <input onChange={handleInput} value={user.password} className='text-4xl rounded-3xl p-2 bg-white m-2 w-72' type="password" placeholder='password' name='password' />
                <NavLink to="/forgetpassword"><h2 className='mr-42 -m-1 cursor-pointer active:scale-105'>Forgot password</h2></NavLink>
                <button className='text-center rounded-3xl font-bold p-2 active:scale-90 bg-red-600 hover:bg-red-500 w-52 ml-15 m-4 cursor-pointer'>Login</button>
              </form>
              <p className='m-3'>Dont't Have An Account ? <NavLink to="/register"> <button className='text-center rounded-3xl font-bold p-2 active:scale-90 cursor-pointer bg-red-600 hover:bg-red-500 w-30'>Register</button></NavLink> </p>
            </div>
  
        </div>
    </div>
    </>
    </>
  )
}

export default Login