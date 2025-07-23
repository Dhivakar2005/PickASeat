import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './../App.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(credentials.email, credentials.password);
    if (success) {
      toast.success('Login Successful');
      navigate('/');
    } else {
      toast.error('Invalid credentials or not signed up');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <Link to="/" ><button type="submit" className="red-glass-btn">Login</button></Link>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
    

  );
};

export default Login;
