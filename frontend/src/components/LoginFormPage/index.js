// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Logo from '../Navigation/Logo';
import './LoginForm.css';
import TextField from '@mui/material/TextField';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      },
    );
  };

  return (
    <div className="loginFormPage">
      <NavLink to="/" className="logo">
        <Logo />
      </NavLink>
      <h1>Welcome back!</h1>
      <div className="formContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <TextField
            id="loginForm_usernameField"
            label="Username or Email"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setCredential(e.target.value)}
            required="true"
            margin="normal"
          ></TextField>
          <TextField
            id="loginForm_passwordField"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            required="true"
            margin="normal"
          ></TextField>
          <button type="submit">Log In</button>
          <h2>
            First time?
            <span>
              <NavLink to="/signup"> Sign up!</NavLink>
            </span>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
