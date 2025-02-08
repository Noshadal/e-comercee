import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Color-changing and bouncing 404 text */}
      <h1 className="text-6xl font-bold animate-bounce ">
        404
      </h1>
      <h2 className="text-4xl mt-4">Page Not Found</h2>
      <p className="mt-4 text-lg text-center">
        Oops! It looks like you're lost in the wilderness.
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-500 hover:text-white transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
          </div>
  );
};

export default NotFound;
