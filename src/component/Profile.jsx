import React, { useEffect, useState } from 'react';
import { db } from "./firbase.cofig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navber';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navig = useNavigate();
  const id = localStorage.getItem('uid'); 

  function logouthandle() {
    localStorage.removeItem('uid');
    navig("/login");
  } 

  useEffect(() => {
    if (id) { 
      const q = query(collection(db, "users"), where("uid", "==", id));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setUserData(list[0]); // Assuming one user's profile
      });

      return () => unsubscribe();
    }
  }, [id]);

  return (
    <>
    <Navbar/>
    <div className='flex h-screen w-screen items-center justify-center bg-[#143659] p-4'>
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center text-[#f4641a] mb-6'>Profile</h1>

        {userData ? (
          <div className='space-y-4'>
            <p className='text-lg text-[#143659]'><span className='font-semibold'>Name:</span> {userData.firstName} {userData.lastName}</p>
            <p className='text-lg text-[#143659]'><span className='font-semibold'>Email:</span> {userData.email}</p>
            <p className='text-lg text-[#143659]'><span className='font-semibold'>Phone:</span> {userData.phone}</p>
            <p className='text-lg text-[#143659]'><span className='font-semibold'>Address:</span> {userData.address}</p>
            <p className='text-lg text-[#143659]'><span className='font-semibold'>Password:</span> {userData.psw}</p>

            <button 
              className='w-full bg-[#f4641a] text-white py-2 rounded-lg hover:bg-[#d9530d] transition duration-200' 
              onClick={logouthandle}
            >
              Logout
            </button>
          </div>
        ) : (
          <p className='text-center text-gray-500'>Loading...</p>
        )}
      </div>
    </div>
        </>
  );
};

export default Profile;
