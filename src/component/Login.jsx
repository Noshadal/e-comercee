import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firbase.cofig';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, psw);
      const uid = response.user.uid;

      Swal.fire({
        title: 'Login Successful!',
        icon: 'success',
      });
      localStorage.setItem('uid', uid);
      navigate('/home'); // Redirect to home or any other page
    } catch (error) {
      Swal.fire({
        title: 'Login Failed!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>

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
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Login
            </button>
          )}

          <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-400 mt-4">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
