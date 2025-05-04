import React, { useEffect, useReducer, useState } from 'react'
import cartimage from "../assets/cart.png"
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Cart = () => {
 
   const [val,setVal]=useState(0)
   const {cartitem,setCartitem,quantities,setQuantities,isloggedin}=useAuth()

  const updateQuantityInDB = async (itemId, quantity) => {
    try {
      await fetch(`https://buyitecommerce.onrender.com/api/cart/cart/update/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error("Error updating quantity in DB:", error);
    }
  };
  const handlePlus = (itemId) => {
    setQuantities(prev => {
      const newQuantity = Number(prev[itemId] + 1);
      updateQuantityInDB(itemId, newQuantity); 
      return {
        ...prev,
        [itemId]: newQuantity
      };
    });
  };
  
  const handleMinus = (itemId) => {
    setQuantities(prev => {
      const newQuantity = Number(prev[itemId] > 1 ? prev[itemId] - 1 : 1);
      updateQuantityInDB(itemId, newQuantity); // Sync with DB
      return {
        ...prev,
        [itemId]: newQuantity
      };
    });
  };
    
  const handleDelete=async(itemid)=>{
  try {
    const res=await fetch(`https://buyitecommerce.onrender.com/api/cart/delete/${itemid}`,{
      method:"DELETE",
      credentials:'include'
    })
    if (res.ok) {
      setCartitem(prev => prev.filter(item => item._id !== itemid));
    } else {
      console.error("Failed to delete item");
    }
  } catch(error) {
    console.error(error);
  }
  }


  useEffect(() => {
    const total=cartitem.reduce((sum,item)=>{
      const quantity=quantities[item._id] || 1;
      
      return sum+item.price * quantity;
    },0)
    
    
    setVal(total)
  }, [quantities,cartitem])

  

  return (
    <>
    <div>
        <Navbar/>
        <SubNavbar/>
        <div className=' w-full '>
          <div className='  w-full h-10 p-10 text-2xl space-y-6 '>
            {cartitem.length > 0 ?(<><ul className='grid grid-cols-5 justify-evenly items-center m-2 '>
              <li className='font-bold'>Product</li>
              <li className='font-bold'>Item </li>
              <li className='font-bold'>Quantity</li>
              <li className='font-bold'>Price</li>
              {/* <li className='font-bold'>CheckOut</li> */}
              <button className='font-bold'>Remove</button>
            </ul></>) :(<></>) }
            
            {cartitem.map((item,idx)=>(

            <ul key={idx} className=' shadow-xl rounded-3xl p-4 grid grid-cols-5 justify-evenly items-center hover:bg-lime-50'>
          {item.images && item.images.map((img, imgIdx) => ( 
  <li key={imgIdx} className="cursor-pointer">
    <img 
      src={`https://buyitecommerce.onrender.com${img.url}`} 
      alt={img.alt || "Product Image"} 
      className="w-20 h-20 object-contain" 
    />
  </li>
))}

              <li className="cursor-pointer">{item.title}</li>
              <li className="cursor-pointer ml-5">
              <button onClick={() => handleMinus(item._id)}  className='rounded-3xl active:scale-95 bg-red-400 w-11'>-</button>
              <span className='shadow-2xl  p-2 rounded-3xl'>{quantities[item._id]}</span>
              <button onClick={() => handlePlus(item._id)} className='bg-red-600 active:scale-95 w-11 rounded-3xl'>+</button>
              </li>
              <li className="cursor-pointer"> ₹{item.price*quantities[item._id]}</li>
              {/* <li><button className='bg-red-500 p-2 text-xl m-6 font-bold rounded-4xl active:scale-95'>Buy Now</button></li> */}
              <button onClick={() => handleDelete(item._id)} ><i className="fa-solid fa-trash active:scale-95 cursor-pointer"></i></button>
            </ul>
            ))}
            {
             cartitem.length>0 ? (
              <> <div className='shadow-2xl bg-amber-200 rounded-3xl  w-76 h-44 flex flex-col justify-center items-center p-5'>          
                <h1 className='text-4xl font-sans'>subtotal:₹{val}</h1>
                <NavLink to="/buy" state={{ total: val }} ><button className='bg-red-500 p-2 rounded-4xl  active:scale-90'>Buy Now</button></NavLink>
            </div>
            </>
            ) 
            :
            (<><h1 className='text-center m-52 font-mono flex justify-center items-center '>Your cart is Empty <img className='w-20 h-20' src={cartimage} alt="" /> </h1></>)
            }
           
           
          </div>
        </div>
    </div>
    </>
  )
}

export default Cart