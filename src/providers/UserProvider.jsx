import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const URL_BASE = 'https://portalservices-backend.onrender.com';
const initialStateToken = localStorage.getItem('token') || null;
const initialStateLogin = JSON.parse(localStorage.getItem('userLogin')) || null;

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(initialStateToken);
  const [userLogin, setUserLogin] = useState(initialStateLogin);
  const [publicaciones, setPublicaciones] = useState([]);
  const [misPublicaciones, setMisPublicaciones] = useState([]);
  const [misFavoritos, setMisFavoritos] = useState([]);
  const [respuesta, setRespuesta] = useState({});
  const [filtros, setFiltros] = useState ({});


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

  const getPublicaciones = async (page=1) => {
    let URL = `${URL_BASE}/servicios?page=${page}`;
    if(filtros?.titulo){
      URL += `&titulo=${filtros.titulo}`; 
    }
    if (filtros?.ciudad){
      URL += `&ciudad=${filtros.ciudad}`;
    }
    if (filtros?.comuna){
      URL += `&comuna=${filtros.comuna}`;
    }

    const response = await fetch(`${URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const { results, meta } = data;
    setPublicaciones(results);
    setRespuesta(meta);
    setFiltros({});
  };

  const getPublicacion = async (id) => {
    const URL = `${URL_BASE}/servicios/${id}`;
    const response = await fetch(`${URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {results} = await response.json();

    return results;
  };

  const getPublicacionesUsuario = async () => {
    const response = await fetch(`${URL_BASE}/user/servicios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const { results } = data;

    setMisPublicaciones(results);
  };

  const newPublicacionUsuario = async (publicacion) => {
    const response = await fetch(`${URL_BASE}/user/servicios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(publicacion),
    });
    const data = await response.json();

    return data;
  };

  const updatePublicacionUsuario = async (publicacion) => {
    const response = await fetch(`${URL_BASE}/user/servicios`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(publicacion),
    });
    const data = await response.json();

    return data;
  };

  const deletePublicacionUsuario = async (publicacion_id) => {
    const response = await fetch(`${URL_BASE}/user/servicios`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ publicacion_id }),
    });
    const data = await response.json();

    return data;
  };

  const getFavoritosUsuario = async () => {
    const response = await fetch(`${URL_BASE}/user/favoritos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    setMisFavoritos(data.results);

    return data.results;
  };

  const newFavorito = async (usuario_id, publicacion_id) => {
    const response = await fetch(`${URL_BASE}/user/favoritos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ usuario_id, publicacion_id }),
    });
    const {results} = await response.json();

    return results;
  }

  const deleteFavorito = async (favorito_id) => {
    const response = await fetch(`${URL_BASE}/user/favoritos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favorito_id }),
    });
    const data = await response.json();

    return data;
  }

  const updateProfileUser = async (newProfile) => {
    const response = await fetch(`${URL_BASE}/perfil`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProfile),
    });
    const data = await response.json();

    return data;
  };


  useEffect(() => {
    if (token && userLogin) {
      localStorage.setItem('token', token);
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userLogin');
    }
  }, [ token, userLogin]);

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
        getPublicaciones,
        getPublicacion,
        misPublicaciones,
        getPublicacionesUsuario,
        newPublicacionUsuario,
        updatePublicacionUsuario,
        deletePublicacionUsuario,
        misFavoritos,
        getFavoritosUsuario,
        newFavorito,
        filtros,
        setFiltros,
        deleteFavorito,
        respuesta,
        updateProfileUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
