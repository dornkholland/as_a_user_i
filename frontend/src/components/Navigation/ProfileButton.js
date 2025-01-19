// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { User } from 'react-feather';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profileContainer">
      <button className="profileContainer__avatar" onClick={openMenu}>
        <User size={35} />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Hi, {user.name}!</li>
          <li>{user.email}</li>
          <li>Collaborator id: {user.id}</li>
          <li>
            <Link to="/projects" className="profileContainer__project">
              My Projects
            </Link>
          </li>
          <li>
            <button onClick={logout} className="logout">
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
