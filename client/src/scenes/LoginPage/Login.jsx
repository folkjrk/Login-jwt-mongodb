import React from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/index';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3100/auth/login', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const loggedIn = response.data;

      // set state persistence
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user.username,
            token: loggedIn.token,
          })
        );
        // set localstorage
        localStorage.setItem('accessToken', loggedIn.token);
        console.log(loggedIn);
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <div>
        <h2 className='m-10'> Welcome! Sign in to your account below </h2>
      </div>
      <div className="flex items-center justify-center">
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={(values) => {
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className="px-4 py-2 border rounded-md text-white"
                />
                {errors.username && touched.username && (
                  <div className="text-red-500 ml-2">{errors.username}</div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="px-4 py-2 border rounded-md text-white"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 ml-2">{errors.password}</div>
                )}
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
