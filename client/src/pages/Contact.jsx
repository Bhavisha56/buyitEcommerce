import { useEffect } from 'react';
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import img from "../assets/Learning-amico.png"
import Footer from '../components/Footer'
import { useAuth } from '../../context/Auth'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import { useParams } from 'react-router-dom'
const Contact = () => {
  // const {id}=useParams() 
  const {userinfo}=useAuth()
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });

useEffect(() => {
  if (userinfo) {
    setUser(prev => ({
      ...prev,
      name: userinfo.name || "",
      email: userinfo.email || ""
    }));
  }
}, [userinfo]);


const handleInput=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  setUser((prev)=>({
    ...prev,
    [name]:value
  }))
}
const handleSubmit=async(e)=>{
  e.preventDefault()
  if(!user.message || !user.email || !user.name){
    alert("All Fields are required")
  }
  try {
    const res=await fetch(`https://buyit-backend.onrender.com/api/contact`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user),
      credentials:'include'
    })
    if(res.ok){
      toast.success("Message Sent", {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      });
    }
    
  } catch(error) {
    console.error(error);
  }
}

  return (
    <>
    <div className=''>
      <Navbar/>
      <SubNavbar/>
      <div className='p-44 pl-20'>
        <div className='grid grid-cols-2 '>
        <img className='img' src={img} alt="" />
        <div>
          <form onSubmit={handleSubmit} className=' flex flex-col  bg-lime-500  rounded-4xl p-10'>
            <h1 className='text-center text-3xl underline'>Contact Form</h1>
            <input onChange={handleInput} value={user.name} className='p-2 m-3  outline-2 text-2xl  rounded-4xl border-black' type="name"  name="name" id="" placeholder='name' />
            <input onChange={handleInput}  value={user.email} className='p-2 m-3 outline-2 text-2xl rounded-4xl border-black' type="email" name="email" id="" placeholder='email' />
            <textarea onChange={handleInput} value={user.message} name="message" id="" className='rounded-2xl p-3 outline-2 m-3  max-h-44' placeholder='Write Your Message here....'></textarea>
            <button className='bg-black active:scale-90 text-white text-3xl rounded-4xl w-44 flex justify-center items-center ml-50 p-3'>Submit</button>
          </form>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Contact