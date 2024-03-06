import { createContext, useEffect, useState } from 'react';
import { dataPublicaciones, dataUsuarios } from './Data';

export const UserContext = createContext();

const URL_BASE = 'https://portalservices-backend.onrender.com';
const initialStateToken = localStorage.getItem('token') || null;
const initialStateLogin = JSON.parse(localStorage.getItem('userLogin')) || null;

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(initialStateToken);
  const [userLogin, setUserLogin] = useState(initialStateLogin);
  const [publicaciones, setPublicaciones] = useState(dataPublicaciones);

  useEffect(() => {
    if (token && userLogin) {
      localStorage.setItem('token', token);
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userLogin');
    }
  }, [token, userLogin]);

  const loginUsuario = async (email, contraseña) => {
    const response = await fetch(`${URL_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña }),
    });
    const data = await response.json();
    setToken(data?.token || null);
    setUserLogin(data?.usuario || null);

    return data;
  };

  const registerUsuario = async (userRegister) => {
    const response = await fetch(`${URL_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userRegister),
    });
    const data = await response.json();

    return data;
  };

  const logOut = () => {
    setToken(null);
    setUserLogin(null);
  };

  const getPublicacionesUsuario = () => {
    const result = publicaciones.filter(
      (publicacion) => publicacion.usuarioId === userLogin.usuarioId
    );

    return result;
  };

  const newPublicacionUsuario = (publicacion) => {
    console.log(publicacion);
  };

  const updatePublicacionUsuario = (publicacion) => {
    console.log(publicacion);
  };

  const deletePublicacionUsuario = (publicacionId) => {
    const result = publicaciones.filter(
      (publicacion) => publicacion.publicacionId !== publicacionId
    );

    setPublicaciones(result);
  };

  return (
    <UserContext.Provider
      value={{
        loginUsuario,
        registerUsuario,
        token,
        userLogin,
        setUserLogin,
        logOut,
        publicaciones,
        getPublicacionesUsuario,
        newPublicacionUsuario,
        updatePublicacionUsuario,
        deletePublicacionUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
