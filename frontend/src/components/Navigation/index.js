import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoUser from '../DemoUser';
import Logo from './Logo';
import './Navigation.css';

function Navigation({ projectName, isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <DemoUser />
      </>
    );
  }

  return (
    <div className="navbar">
      <NavLink className="navbar__logo" to="/">
        <Logo />
      </NavLink>
      <h1>{projectName}</h1>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
