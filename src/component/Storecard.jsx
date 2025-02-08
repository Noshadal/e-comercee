import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Storecard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Failed to fetch products", error));
  }, []);

  const handleNavigate = (product) => {
    navigate("/Product", { state: product });
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container max-w-full px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <div key={product.id} className="mx-3 my-3 bg-black relative">
              {/* 10% Discount Label */}
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                10% OFF
              </span>

              <div
                className="bg-white border-2 border-gray-300 flex-col flex gap-3 justify-center items-center rounded-lg h-[90vh] shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                onClick={() => handleNavigate(product)}
              >
                <img
                  className="rounded-t-lg w-64 h-64 object-contain"
                  src={product.image}
                  alt={product.title}
                />
                <div className="mx-4 pb-5 w-64">
                  <div className="flex items-center mt-2.5 mb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.title}
                    </h5>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {product.rating?.rate}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-white">
                    {product.description.slice(0, 20)}...
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between flex-col gap-2">
                    <button
                      className="text-black font-semibold bg-[#f4641a] hover:bg-[#f3783b] w-full mt-2 py-2 rounded-md"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      Add to cart
                    </button>
                    <button
                      className="text-[#f4641a] font-semibold bg-black w-full mt-2 py-2 rounded-md"
                      onClick={() => handleNavigate(product)}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Storecard;
