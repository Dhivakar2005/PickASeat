import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './../App.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="nav">
      <section className="navbar">
        <img className="logoo" src="/src/assets/logoo.png" alt="Logo" />

        <div className="burger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={menuOpen ? 'active' : ''}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/mybooking">MyBookings</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>

        <div className={menuOpen ? 'search active' : 'search'}>
          <img src="/src/assets/Searchicon.png" alt="search" />

          {user ? (
            <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src="/src/assets/profile.png"
                alt="Profile"
                onClick={() => setOpenDropdown(!openDropdown)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              />
              {openDropdown && (
                <div className="dropdown-content">
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navbar;
