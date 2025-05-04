import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import SingleProductData from './pages/SingleProductData'
import Order from './pages/Order'
import BuyNow from './pages/BuyNow'
import Contact from './pages/Contact'
import SingleDataForMainCard from './pages/SingleDataForMainCard'
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ForegetPassword from './pages/ForegetPassword'
const App = () => {
  return (
    <>

   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/login' element={<Login/>}></Route>
   <Route path='/forgetpassword' element={<ForegetPassword/>}></Route>
   <Route path='/register' element={<Register/>}></Route>
   <Route path='/cart/:id' element={<Cart/>}></Route>
   <Route path='/product/:id' element={<SingleProductData/>}></Route>
   <Route path='/mainproduct/:id' element={<SingleDataForMainCard/>}></Route>
   <Route path='/order' element={<Order/>}></Route>
   <Route path='/contact' element={<Contact/>}></Route>
   <Route path='/buy' element={<BuyNow/>}></Route>
   </Routes>
   <ToastContainer/>
   </>
  )
}

export default App