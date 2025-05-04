import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// NavLink
const ForgetPassword = () => {
  const Navigate=useNavigate()

  const [pass, setPass] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPass({
      ...pass,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://buyit-backend.onrender.com/api/auth/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pass),
      });
     if(res.ok){
      toast.success("Password Reset", {
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
      setTimeout(() => {
        Navigate("/login");
      }, 2000);
     }
      
      
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className='bg-black w-full h-screen flex justify-center items-center'>
              <NavLink to='/'><h1 className='relative bottom-80 right-96 bg-lime-500 rounded-4xl p-2'>Back to Home</h1></NavLink>
        <div className='bg-lime-300 w-96 rounded-3xl'>
          <h1 className='text-center p-4 text-3xl'>Reset Your Password</h1>
          <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
            <input
              onChange={handleInput}
              name="email"
              type="email"
              placeholder="Enter email"
              className='p-3 w-72 rounded-xl'
              required
            />
            <input
              onChange={handleInput}
              name="password"
              type="password"
              placeholder="New password"
              className='p-3 w-72 rounded-xl'
              required
            />
            <button
              type="submit"
              className='bg-red-500 rounded-xl px-5 py-2 text-white font-semibold hover:bg-red-600 transition'
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
