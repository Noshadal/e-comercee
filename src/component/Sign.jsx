import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firbase.cofig';
import { setDoc, doc } from 'firebase/firestore';

function Sign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, psw);
      const uid = response.user.uid;
      await setDoc(doc(db, 'users', uid), {
        firstName,
        lastName,
        email,
        uid,
        phone,
        city,
        psw,
        address,
      });

      Swal.fire({
        title: 'User Successfully Registered!',
        icon: 'success',
      });
      localStorage.setItem('uid', uid);
      navigate('/login');
    } catch (error) {
      Swal.fire({
        title: 'Something Went Wrong!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-6">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="firstName"
              className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="lastName"
              className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <input
            type="password"
            id="password"
            className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
            placeholder="Password"
            required
            onChange={(e) => setPsw(e.target.value)}
          />
        </div>

        {/* Phone, City, and Address Fields */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
            placeholder="Phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            id="city"
            className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
            placeholder="City"
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            id="address"
            className="block w-full px-3 py-2 text-sm text-gray-900 border rounded-md border-gray-300 focus:border-blue-600 focus:outline-none peer"
            placeholder="Address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center">
          {isLoading ? (
            <div className="w-full text-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Submit
            </button>
          )}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-400 mt-4">
            I already have an account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Sign;
