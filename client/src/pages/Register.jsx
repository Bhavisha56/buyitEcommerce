import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Register = () => {

 const {RegisterData,userdata,setUserdata}=useAuth()
  const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setUserdata({
      ...userdata,
      [name]:value,
    })
  }

  const handleSubmit=async(e)=>{
     e.preventDefault();
     if (!userdata.name || !userdata.email || !userdata.password) {
      alert("All fields are required!");
      return;
    }

    if (!userdata.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (userdata.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
     RegisterData()
  }
  return (
    <>
    <div className='bg-black w-full h-screen flex justify-center items-center'>
            <NavLink to='/'><h1 className='relative bottom-80 right-96 bg-lime-500 rounded-4xl p-2'>Back to Home</h1></NavLink>
        <div className='bg-lime-300 w-96  rounded-3xl'>
              <h1 className='text-center text-3xl m-7 ml-33 mr-33 cursor-pointer font-bold bg-lime-500  rounded-tr-3xl p-2 rounded-bl-3xl'>BuyIt</h1>
            <div className='text-center'>
              <form onSubmit={handleSubmit} className='grid grid-cols-1 m-8 '>
                <input onChange={handleInput} value={userdata.name}  className='text-4xl rounded-3xl p-2  bg-white m-2 w-72' type="name" placeholder='name' name='name' />
                <input onChange={handleInput} value={userdata.email} className='text-4xl rounded-3xl p-2 bg-white m-2 w-72' type="email" placeholder='email' name='email' />
                <input onChange={handleInput} value={userdata.password} className='text-4xl rounded-3xl p-2 bg-white m-2 w-72' type="password" placeholder='password' name='password' />
                <button className='text-center rounded-3xl font-bold p-2 active:scale-90 bg-red-600 hover:bg-red-500 w-52 ml-15 m-4'>Register</button>
              </form>
              <p className='m-3'>Already Have An Account ? <NavLink to="/login"> <button className='text-center rounded-3xl font-bold p-2 active:scale-90 bg-red-600 hover:bg-red-500 w-30'>Login</button> </NavLink></p>
            </div>
  
        </div>
    </div>
    </>
  )
}

export default Register