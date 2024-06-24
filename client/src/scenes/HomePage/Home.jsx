// components/Home.js
import React from "react";
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const tokenSession = localStorage.getItem("accessToken");

  if (!tokenSession) {
    return (
      <div className="m-10">
        <h1>You are not logged in</h1>
      </div>
    );
  }

  return (
    <div className="m-10 flex items-center justify-center">
      <h1>Home page, login successful</h1>
      <h2>User Profile</h2>
      <p>Username: {user}</p>
      <p>TokenFormState: {token}</p>
      <p>TokenFormLocalStorage: {tokenSession}</p>
    </div>
  );
};

export default Home;
