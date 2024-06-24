import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector} from 'react-redux';
import Login from './scenes/LoginPage/Login';
import Home from './scenes/HomePage/Home'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
        </ Routes>    
      </BrowserRouter>
  )
}

export default App
