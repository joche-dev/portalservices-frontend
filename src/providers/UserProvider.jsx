import { createContext, useEffect, useState } from 'react';
import { dataPublicaciones } from './Data';

export const UserContext = createContext();

const URL_BASE = 'http://localhost:5000/users';
const initialStateToken = localStorage.getItem('token') || null;

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(initialStateToken);
  const [login, setLogin] = useState({email: 'user@portalservicios', password: '123456'});
  const [user, setUser] = useState({});
  const [publicaciones, setPublicaciones] = useState(dataPublicaciones)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const loginUsuario = async (email, password) => {
    const response = await fetch(`${URL_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user || null);
    setToken(data.token || null);

  };

  const registerUsuario = async (nombre, email, contraseña, ciudad, comuna) => {
    const response = await fetch(`${URL_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, contraseña, ciudad, comuna }),
    });
    const data = await response.json();
    return data;
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        loginUsuario,
        registerUsuario,
        token,
        login,
        logout,
        publicaciones
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
