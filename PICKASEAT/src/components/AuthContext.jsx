import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);

    if (!existingUser) {
      return { success: false, message: 'User not found. Please sign up first.' };
    }

    if (existingUser.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }

    localStorage.setItem('user', JSON.stringify(existingUser));
    setUser(existingUser);
    return { success: true };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) return false;

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
