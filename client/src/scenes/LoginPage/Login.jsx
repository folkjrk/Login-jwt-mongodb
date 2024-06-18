import React from 'react';
import { Formik } from 'Formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from "../../state/index";
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = async(values,{setSubmitting}) => {
  
    try{
      const response = await axios.post('http://localhost:3200/auth/login', values,{
        headers:{
          'Content-Type': "application/json",
        }
      })
      const loggedIn = response.data;

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user.username,
          token: loggedIn.token,
        })
      );
      localStorage.setItem("accessToken", loggedIn.token);
      console.log(loggedIn)
      navigate("/home");
    }}catch(err){
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
       initialValues={{ username: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.username) {
           errors.username = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
         ) {
           errors.username = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={handleSubmit}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="username"
             name="username"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
           />
           {errors.username && touched.username && errors.username}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
  );
};

export default Login;
