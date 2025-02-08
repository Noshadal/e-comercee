import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navber';
import { useNavigate } from 'react-router-dom';
import Storecard from './Storecard';
import { IoStarSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <div>Product details not available.</div>;
  }

  // Calculate 10% discount
  const originalPrice = parseFloat(state.price);
  const discountedPrice = (originalPrice * 0.9); 

  const handleAddToCart = () => {
    const product = {
      img: state.img,
      heading: state.heading,
      price: discountedPrice, 
      vote: state.vote
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center p-8 min-h-screen">
        <img
          src={state.image}
          className="h-[60vh] lg:h-[80vh] w-full lg:w-[30vw] object-contain rounded-md shadow-lg transform transition-transform hover:scale-105 duration-300"
          alt={state.heading}
        />
        <div className="flex flex-col justify-center mt-6 lg:mt-0 lg:ml-10 bg-white p-6 rounded-lg shadow-2xl w-full lg:w-[40vw]">
          <h2 className="text-black text-[6vh] font-bold border-b-4 border-[#f4641a] pb-2 transition-colors duration-300">
            {state.title}
          </h2>
          <p className="text-[#f4641a] flex text-[4vh] font-semibold mb-4">
            Price:
            <span className="text-gray-500 line-through ml-2">${originalPrice}</span>
            <span className="text-black font-bold ml-2">${discountedPrice}</span>
          </p>
          <div className="flex items-center text-[3vh] font-semibold mb-6">
            Rating: {state.rate}
            <IoStarSharp className='text-yellow-300' />
            <IoStarSharp className='text-yellow-300' />
            <IoStarSharp className='text-yellow-300' />
            <IoStarSharp className='text-yellow-300' />
          </div>
          <div className="flex space-x-4">
            <button
              className="text-white font-semibold bg-black w-full mt-2 py-4 rounded-md"
              onClick={() => {
                Swal.fire({
                  title: 'Order successfully submitted!',
                  icon: 'success',
                });
                navigate('/Home');
              }}
            >
              BUY NOW
            </button>

            <button
              className="text-white font-semibold bg-[#f4641a] hover:bg-[#f3783b] w-full mt-2 py-4 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Storecard />
    </>
  );
};

export default Product;
