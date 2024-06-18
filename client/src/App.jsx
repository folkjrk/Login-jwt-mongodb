import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useDispatch} from 'react-redux';
import Login from './scenes/LoginPage/Login';
import Home from './scenes/HomePage/Home'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from "react";
import { setLogin } from "./state";

function App() {
  const dispatch = useDispatch();
  const StoredToken = localStorage.getItem('accessToken');

  useEffect(()=>{
    if(StoredToken) {
      dispatch(setLogin(StoredToken));
    }
  }, [dispatch]);
  const isAuth = Boolean(StoredToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
        </ Routes>    
      </BrowserRouter>
    </>
  )
}

export default App
