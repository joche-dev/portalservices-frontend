import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './providers/UserProvider.jsx';

import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Services from './pages/Services/Services.jsx';
import DetalleService from './pages/DetalleService/DetalleService.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';
import MyServices from './pages/MyServices/MyServices.jsx';
import MyFavorites from './pages/MyFavorites/MyFavorites.jsx';
import { PrivateRoute } from './components/PrivateRoute.jsx';

function App() {
  const { token } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<DetalleService />} />
        <Route element={<PrivateRoute token={token} />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/user/services" element={<MyServices />} />
          <Route path="/user/favorites" element={<MyFavorites />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
