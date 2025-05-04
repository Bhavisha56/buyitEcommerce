import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// Link
const Card = () => {
  const [products, setProducts] = useState([]);
  const {isloggedin}=useAuth()
  const Navigate=useNavigate()
  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://buyit-backend.onrender.com/api/products/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data.products); 
      if(response.ok){
        console.log(data.products);
      }
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart=()=>{
    if(!isloggedin){
      toast.error('Not Login', {
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
            
      setTimeout(()=>{
       Navigate("/login")
      },1500)
    }
  }
  // console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-wrap gap-5 justify-center m-10'>
      {products.map((product, index) => (
        <Link to={`/product/${product._id}`} key={index}>
        <div className='shadow-2xl w-72 p-5 rounded-3xl  hover:bg-lime-200 transition delay-50 duration-500 ease-in-out'>
          <div className='text-center p-4'>

           
            <div className=' flex  gap-2 overflow-x-auto justify-center mb-3'>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_BASE_URL}${img.url}`}
                  alt={img.alt || "product image"}
                  className='h-24 w-24 object-cover rounded'
                />
              ))}
            </div>

            <h6 className='text-sm mt-2'>⭐ {product.ratings}</h6>
            <h2>{product.title}</h2>
            <h2>₹{product.price}</h2>
            <h2 className='font-bold text-green-700'>20% Off</h2>
            <button onClick={handleAddToCart} className='cursor-pointer bg-red-500 text-white mt-2 px-4 py-2 rounded-lg active:scale-95'>
              Add To Cart
            </button>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
