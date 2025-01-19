// frontend/src/components/SignupFormPage/index.js
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import DemoUser from '../DemoUser';
import Logo from '../Navigation/Logo';
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password, name }),
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
  };

  return (
    <div className="signupFormPage">
      <NavLink to="/" className="logo">
        <Logo />
      </NavLink>
      <h1>Get started - it's free!</h1>
      <div className="formContainer">
        <form className="signupForm" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <TextField
            id="signupForm_email"
            label="Email Address"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            required="true"
            margin="normal"
          ></TextField>
          <TextField
            id="signupForm_username"
            label="Username"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setUsername(e.target.value)}
            required="true"
            margin="normal"
          ></TextField>
          <TextField
            id="signupForm_name"
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setName(e.target.value)}
            required="true"
            margin="normal"
          ></TextField>
          <TextField
            id="signupForm_password"
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            required="true"
            margin="normal"
            type="password"
          ></TextField>
          <TextField
            id="signupForm_confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required="true"
            margin="normal"
            type="password"
          ></TextField>
          <button type="submit">Sign Up</button>
          <h2>Or, try us out first!</h2>
          <DemoUser />
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
