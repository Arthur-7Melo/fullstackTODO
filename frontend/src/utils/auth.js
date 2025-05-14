import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
};

export const clearToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
};

export const isAuthenticated = () => {
  const token = getToken()
  if (!token) {
    return false
  };

  try {
    const { exp } = jwtDecode(token)
    if(typeof exp !== 'number') {
      clearToken()
      return false
    };

    const now = Date.now() / 1000;
    if (exp < now) {
      clearToken()
      return false
    };

    return true;
  } catch (error) {
    clearToken()
    return false
  }
};
