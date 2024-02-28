import { createContext, useEffect, useState } from 'react';
import { dataPublicaciones, dataUsuarios } from './Data';

export const UserContext = createContext();

const URL_BASE = 'http://localhost:5000/users';
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

  const loginUsuario = async (email, password) => {
    // const response = await fetch(`${URL_BASE}/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();
    // setUserLogin(data.usuario || null);
    // setToken(data.token || null);
    const data = dataUsuarios.find(
      ({ usuario }) =>
        usuario.email === email && usuario.contraseña === password
    );
    setToken(data?.token || null);
    setUserLogin(data?.usuario || null);

    return data;
  };

  const registerUsuario = async (userRegister) => {
    // const response = await fetch(`${URL_BASE}/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nombre, email, contraseña, ciudad, comuna }),
    // });
    // const data = await response.json();
    const data = dataUsuarios.find(
      ({ usuario }) => usuario.email === userRegister.email
    );
    if (data) {
      return false;
    }

    dataUsuarios.push({
      token: '123',
      usuario: {
        ...userRegister,
        direccion: '',
        fotoperfil: '',
        rol: 'usuario',
      },
    });

    return true;
  };

  const logOut = () => {
    setToken(null);
    setUserLogin(null);
  };

  return (
    <UserContext.Provider
      value={{
        loginUsuario,
        registerUsuario,
        token,
        userLogin,
        logOut,
        publicaciones,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
