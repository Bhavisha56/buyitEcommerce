import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/Auth';
// Link
const Navbar = () => {
  // const {id}=useParams()
const {isloggedin,setIsloggedin,cartitem}=useAuth()
  const [orderitem,setOrderitem]=useState([])
  const fetchitems=async()=>{
   try {
    const res=await fetch(`https://buyitecommerce.onrender.com/api/order`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:'include'
    })
    if(res.ok){
      const data=await res.json();
      setOrderitem(data.items)
      setTimeout(()=>{
       fetchitems()
      },2000)
    }
   } catch(error) {
    console.error(error);
   }
  }
  useEffect(()=>{
    fetchitems()
  },[])

const Navigate=useNavigate()
  const handlelogout=async()=>{
  try {
    const response=await fetch(`https://buyitecommerce.onrender.com/api/auth/logout`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      },
      credentials: 'include',
    })
    if(response.ok){
      setIsloggedin(false)
    }
    Navigate("/login")

  } catch(error) {
    console.error(error)
  }
  }
  const handleAddToCart=()=>{
   if(!isloggedin){
    alert("not login")
   }
  }
 

  return (
    <>
    <div className='bg-black w-full h-30 flex justify-center items-center  '>
        <div className='flex gap-11 mr-72'>
      <NavLink to="/"><h1 className='text-2xl  mr-44 cursor-pointer font-bold bg-lime-500  rounded-tr-3xl p-2 rounded-bl-3xl'>BuyIt</h1></NavLink>  
        <input type="search" placeholder='search here' className='bg-white w-96 rounded-3xl p-2'/>
        </div>
        <div className='text-white flex justify-center gap-10 items-center text-xl cursor-pointer'>
          
          {isloggedin ? (
            <>
            <NavLink to='/'><h1>Home</h1></NavLink>
           <NavLink to="/order"><button className=' text-white active:scale-95 transition relative '>
            {orderitem.length===0 ? <><span>Order</span>
            </> : (<><span className='text-sm relative bottom-4 bg-lime-500 rounded-4xl p-2 font-bold'>{orderitem.length}</span>Order
              </>)}
          </button>
          </NavLink> 
          <NavLink to="/contact"><h1 className='active:scale-90'>Contact</h1></NavLink>
          <NavLink onClick={handlelogout}><h1 className='active:scale-90'>Logout</h1></NavLink>
          <NavLink to='/cart/:id'><h1 className='active:scale-90'><span className='text-sm relative bottom-4 bg-lime-500 rounded-4xl p-2 font-bold'>{cartitem.length}</span><i onClick={handleAddToCart} className='bx bxs-cart'></i>Cart</h1></NavLink> 
          </>
            ):(<>
           <NavLink to="/login"><h1 className='active:scale-90 m-20'>Login</h1></NavLink>
           <NavLink to="/register"><h1 className='active:scale-90'>Register</h1></NavLink>
          </> )}
        </div>
    </div>

    </>
  )
}

export default Navbar