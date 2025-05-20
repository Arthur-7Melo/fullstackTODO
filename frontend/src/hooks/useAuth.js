import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, clearToken, saveToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() =>{
    const token = getToken();

    if(token) {
      try {
        const { id, exp } = jwtDecode(token);
        if (exp * 1000 > Date.now()) {
          setUser({ id, name });
        } else {
          clearToken();
        }
      } catch(error) {
        clearToken();
      }
    }
  },[]);

  const login = useCallback((token) => {
    saveToken(token);

    try {
      const { id } = jwtDecode(token);
      setUser({ id });
    } catch(error) {
      setUser(null);
    }
  },[]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);

    navigate("/login", 
      { replace: true }
    );
  },[navigate]);

  const isAuthenticated = Boolean(user);

  return { user, isAuthenticated, login, logout };
}