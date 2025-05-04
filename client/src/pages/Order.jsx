import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Order = () => {
  // const {id}=useParams();
  const [orderitem,setOrderitem]=useState([])
  const fetchitems=async()=>{
   try {
    const res=await fetch(`https://buyit-backend.onrender.com/api/order`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:'include'
    })
    if(res.ok){
      const data=await res.json();
      setOrderitem(data.items)
    }
   } catch(error) {
    console.error(error);
   }
  }
  const deleteitem=async(id)=>{
    try {
      const res=await fetch(`https://buyit-backend.onrender.com/api/order/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:'include'
      })
      if(res.ok){
        toast.success("Order Cancel", {
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
   fetchitems()
      }
      
    } catch(error) {
      console.error(error);
    }
  }
useEffect(() => {
  fetchitems()
}, [])


  return (
    <>
    <div>
    <Navbar/>
    <SubNavbar/>

    <div className='w-full'>
      <p className='text-2xl p-5'>Your Order List</p>
      {orderitem.map((item,idx)=>(
       <div key={idx} className='grid grid-cols-4 ml-30 m-10 '>
        {item.images.map((img,imgidx)=>(
        <img  
        key={imgidx}
      src={`https://buyit-backend.onrender.com${img.url}`} 
      alt={img.alt || "Product Image"} 
      className="w-20 h-20 object-contain" />
    ))}
        <h1>{item.title}</h1>
        <h1>Delivery by 25-05-2025</h1>
        <button onClick={()=>deleteitem(item._id)} className='bg-yellow-400 rounded-2xl h-15 w-33'>Cancel Order</button>
       </div>
      ))}
    </div>
    </div>
    </>
  )
}

export default Order