import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const Navigate=useNavigate()
    const [isloggedin,setIsloggedin]=useState(false);
    const {id}=useParams()
   const [cartitem,setCartitem]=useState([]);
    const [quantities, setQuantities] = useState({});
    const [userdata,setUserdata]=useState({
    name:"",
    email:"",
    password:"",
    })
    const [userinfo,setUserinfo]=useState({})
   
    const fetchitems = async (id) => {
      try {
        const res = await fetch(`https://buyitecommerce.onrender.com/api/cart/item/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        });
        const data = await res.json();
        setCartitem(data);
  
        const initialQuantities = {};
        data.forEach(item => {
          initialQuantities[item._id] = item.quantity; 
        });
        setQuantities(initialQuantities);
  
      } catch (error) {
        console.error("fetchcartitem error", error);
      }
    };
     useEffect(() => {
        fetchitems();
      }, [id]);
      
     useEffect(() => {
        const checklogin=async()=>{
         try {
          const response = await fetch(`https://buyitecommerce.onrender.com/api/auth/me`, {
            method:"GET",
            credentials: 'include',
          });
          if(response.ok){
            const data = await response.json();
            
            setIsloggedin(true); 
            setUserinfo(data.user)
            
          }else{
            setIsloggedin(false)
          }
         } catch(error) {
          console.error("/me error",error)
         }
        }
        checklogin()
      }, [])

      const RegisterData=async()=>{
          try {
            const response=await fetch(`https://buyitecommerce.onrender.com/api/auth/register`,{
             method:"POST",
             headers:{
               "Content-Type":"application/json",
             },
             body:JSON.stringify(userdata)
            })
            if(response.ok){
              
                      toast.success("Registeration Successfull!", {
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
              setUserdata({
                name:"",
                email:"",
                password:"",
              })
             
             setTimeout(() => {
               Navigate("/login");
             }, 1500);
            }
            
          } catch (error) {
           console.error("Register Error",error);
          }   
        }
        

    return <AuthContext.Provider value={{fetchitems,RegisterData,isloggedin,setIsloggedin,cartitem,setCartitem,quantities,setQuantities,userdata,setUserdata,userinfo}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
  if(!authContextValue){
    throw new Error("useAuth used outside of the Provider")
  }
  return authContextValue
}