import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from "../../state";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const tokenSession = localStorage.getItem("accessToken");


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(setLogout()); 
    navigate('/');
  };

  if (!tokenSession) {
    return (
      <div className="m-10">
        <h1>You are not logged in</h1>
      </div>
    );
  }

  return (
    <div className="items-center">
      <h1>Home page, login successful</h1>
      <h2>User Profile</h2>
      <ul>
        <li>Username: {user}</li>
        <li>TokenFormState: {token}</li>
        <li>TokenFormLocalStorage: {tokenSession}</li>
      </ul>
      <button 
          onClick={handleLogout} 
          className="mt-5 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
    </div>
  );
};

export default Home;
