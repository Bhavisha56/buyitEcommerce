import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const BuyNow = () => {
  const location = useLocation();
  const total = location.state?.total || 0;
const Navigate=useNavigate()
  const [details, setDetails] = useState({
    nameoncard: '',
    cardnumber: '',
    expiration: '',
    Cvv: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!details.nameoncard.trim()) {
      newErrors.nameoncard = 'Name on card is required';
    } else if (!/^[a-zA-Z ]+$/.test(details.nameoncard)) {
      newErrors.nameoncard = 'Only letters allowed in name';
    }

    if (!/^\d{16}$/.test(details.cardnumber)) {
      newErrors.cardnumber = 'Card number must be 16 digits';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(details.expiration)) {
      newErrors.expiration = 'Expiration must be in MM/YY format';
    }

    if (!/^\d{3}$/.test(details.Cvv)) {
      newErrors.Cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {cartitem,setCartitem}=useAuth()

  const buynow = async () => {
    if (paymentMethod !== 'cod' && !validate()) return;
    toast.success("Payment Done", {
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
      Navigate("/Order");
    }, 2000);
    try {
      const res = await fetch(`https://buyitecommerce.onrender.com/api/order/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ items: cartitem, paymentMethod }),

      });
      
    if (res.ok) {
      setCartitem([]); 
      Navigate("/order")
    } else {
      console.error("Failed to place order.");
    }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-black h-screen w-full flex justify-center items-center'>
      <NavLink to='/'><h1 className='absolute top-8 left-8 bg-lime-500 rounded-4xl p-2'>Back to Home</h1></NavLink>
      <div className='bg-white h-fit w-1/2 rounded-3xl p-10'>
        <form className='text-black text-2xl'>
          <div className='grid grid-cols-2'>
            {/* Payment method radio buttons */}
            <div>
              <label className="flex items-center space-x-2 m-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2 m-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debitCard"
                  checked={paymentMethod === 'debitCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Debit Card</span>
              </label>
              <label className="flex items-center space-x-2 m-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>COD</span>
              </label>
            </div>
            {paymentMethod !== 'cod' && (
              <div className='grid grid-cols-2 gap-9 -ml-10'>
                <div>
                  <input onChange={handleInput} value={details.nameoncard}
                    className='border-2 rounded-2xl px-1 m-2 text-sm h-10 w-44'
                    type="text" placeholder='Name On Card' name='nameoncard' />
                  {errors.nameoncard && <p className="text-red-500 text-sm ml-2">{errors.nameoncard}</p>}
                </div>

                <div>
                  <input onChange={handleInput} value={details.cardnumber}
                    className='border-2 rounded-2xl px-1 m-2 text-sm h-10 w-44'
                    type="text" placeholder='Card Number' name='cardnumber' />
                  {errors.cardnumber && <p className="text-red-500 text-sm ml-2">{errors.cardnumber}</p>}
                </div>

                <div>
                  <input onChange={handleInput} value={details.expiration}
                    className='border-2 rounded-2xl px-1 m-2 text-sm h-10 w-44'
                    type="text" placeholder='MM/YY' name='expiration' />
                  {errors.expiration && <p className="text-red-500 text-sm ml-2">{errors.expiration}</p>}
                </div>

                <div>
                  <input onChange={handleInput} value={details.Cvv}
                    className='border-2 rounded-2xl px-1 m-2 text-sm h-10 w-44'
                    type="text" placeholder='CVV' name='Cvv' />
                  {errors.Cvv && <p className="text-red-500 text-sm ml-2">{errors.Cvv}</p>}
                </div>
              </div>
            )}
          </div>
          <div className='bg-red w-52 h-44 mt-10 ml-96'>
            <h1 className='text-xl font-bold'>Total: ₹{total}</h1>
            <hr />
            <p className='text-sm text-blue-500'>Delivery Charges: Free</p>
            <button type='button' onClick={buynow} className='bg-red-300 rounded-3xl p-2 mt-4'>
              {paymentMethod === 'cod' ?'Buy Now' : 'Proceed To Buy'}
            </button>
          </div>
        </form>
        <p className='text-center bg-lime-300 rounded-4xl text-blue-800'>"Hassle Free Payments"</p>
      </div>
    </div>
  );
};

export default BuyNow;
