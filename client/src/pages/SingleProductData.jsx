import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubNavbar from '../components/SubNavbar';
import Footer from '../components/Footer';
import { useAuth } from '../../context/Auth';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// NavLink
const SingleProductData = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const {fetchitems}=useAuth()
 const Navigate=useNavigate()
  const {isloggedin}=useAuth()
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/product/${id}`);
        const data = await res.json();
       
        
        setProduct(data);
      } catch (err) {
        console.error('Error fetching single product:', err);
      }
    };

    fetchProduct();
  }, [id]);


  
  const AddToCart = async () => {
    const cartItem = {
      title: product.title,
      price: product.price,
      images: product.images,
      productId: product._id, 
    };
  
    try {
      const response = await fetch(`http://localhost:5001/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify(cartItem),
      });
      if(response.ok){
        const result = await response.json();
        toast.success("Item Added In Cart", {
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
      }else{
        toast.error('Not login', {
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
     

    } catch (error) {
      console.error("AddToCart error", error);
    }
  };

 


  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="w-full min-h-screen p-10 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-10 max-w-5xl shadow-lg p-10 rounded-xl">
          <img
            className="w-full h-[400px] object-cover rounded-xl"
            src={`http://localhost:5001${product.images[0].url}`}
            alt={product.images[0].alt}
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-2xl text-green-600">₹{product.price}</p>
            <p className="text-yellow-500 text-xl">⭐ {product.ratings} / 5</p>
            <p className="text-gray-600">Category: {product.category}</p>


            <div className="mt-6 flex gap-4">
              <button onClick={AddToCart} className="bg-red-500 text-white px-4 py-2 rounded-lg active:scale-90">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SingleProductData;
