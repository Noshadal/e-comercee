import React, { useEffect, useState } from 'react';
import Navber from './Navber';
import Storecard from './Storecard';

const Addtocard = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  const handleProductDelete = (index) => {
    const updatedCart = [...cartProducts]; 
    updatedCart.splice(index, 1); 
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navber />
      <div className="p-6 flex flex-col items-center bg-white min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-teal-900">Products in Cart</h1>

        {cartProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-screen ">
            <p className="text-xl font-semibold text-black">No products in the cart.</p>
          </div>
        ) : (
          <div className="grid gap-6 w-full max-w-4xl">
            {cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={product.imgage}
                  className="h-28 w-24 object-cover rounded-lg shadow-md"
                  alt={product.heading}
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-xl font-semibold text-teal-900 mb-2 truncate">{product.heading}</h2>
                  <p className="text-lg text-gray-700">Price: {product.price}</p>
                </div>
                <button
                  onClick={() => handleProductDelete(index)}
                  className="ml-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Storecard />
    </>
  );
};

export default Addtocard;
