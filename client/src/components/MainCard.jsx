import React, { useEffect, useState } from 'react';
import Tshirt from '../assets/download.jpeg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const MainCard = () => {
  const [mainitem, setMainitem] = useState([]);
  const [loading, setLoading] = useState(true); // loader state
  const { isloggedin } = useAuth();

  useEffect(() => {
    const fetchFormain = async () => {
      try {
        const res = await fetch(`https://buyitecommerce.onrender.com/api/main/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setMainitem(data.GetProduct);
        }
      } catch (error) {
        console.error( error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormain();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); 

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-dashed border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    );
  }


  return (
    <>
      <div className="grid grid-cols-5 gap-4 m-3">
        {isloggedin ? (
          mainitem.map((item, idx) => (
            <Link to={`/mainproduct/${item._id}`} key={idx}>
              <div className="shadow-2xl w-52 h-76 p-5 rounded-3xl hover:bg-lime-200 transition delay-50 duration-500 ease-in-out">
                <div className="text-center p-8">
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://buyitecommerce.onrender.com${img.url}`}
                      alt={img.alt || 'product image'}
                      className="h-24 w-24 object-cover rounded"
                    />
                  ))}
                  <h6 className="text-sm">⭐{item.ratings}</h6>
                  <h2>{item.title}</h2>
                  <h2>₹{item.price}</h2>
                  <h2 className="font-bold text-green-800">50% Off</h2>
                  <button className="cursor-pointer bg-red-500 rounded-3xl p-1 h-9 font-bold active:scale-95">
                    Add To Cart
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          [...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="shadow-2xl w-52 h-76 p-5 rounded-3xl hover:bg-lime-200 transition delay-50 duration-500 ease-in-out"
            >
              <div className="text-center p-8">
                <img
                  src={Tshirt}
                  alt={'Tshirt'}
                  className="h-24 w-24 object-cover rounded"
                />
                <h6 className="text-sm">⭐4.5</h6>
                <h2>Tshirt</h2>
                <h2>5000</h2>
                <h2 className="font-bold text-green-800">50% Off</h2>
                <button className="cursor-pointer bg-red-500 rounded-3xl p-1 h-9 font-bold active:scale-95">
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MainCard;
