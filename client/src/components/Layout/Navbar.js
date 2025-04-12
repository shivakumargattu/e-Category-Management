import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import '../../styles/main.css';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">E-Commerce Dashboard</div>
      <div className="navbar-user">
        {user && (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;