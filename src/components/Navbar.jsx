import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Logo from '../assets/Logo';

import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import ImgPerfil from './ImgPerfil';

const Navigation = () => {
  const { token, userLogin, logOut } = useContext(UserContext);

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="logo">
            <Logo w={'60'} />
            Portal de Servicios
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-end align-items-md-center">
            <NavLink
              className={({ isActive }) => (isActive ? 'link active' : 'link')}
              to={'/'}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link active' : 'link')}
              to={'/services'}
            >
              Servicios
            </NavLink>
            {token && userLogin.nombre ? (
              <div className="dropdown d-flex flex-column align-items-end ms-2">
                <span data-bs-toggle="dropdown" aria-expanded="false" className='d-flex align-items-center navbar-perfil'>
                  <ImgPerfil name={userLogin.nombre} img={userLogin.fotoperfil}/>
                </span>
              
                <ul className="dropdown-menu dropdown-menu-end text-center">
                  <li><Link className="dropdown-item" to="/perfil"><i className="bi bi-pencil-square"></i> Editar Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/user/services"><i className="bi bi-images"></i> Mis Publicaciones</Link></li>
                  <li><Link className="dropdown-item" to="/user/favorites"><i className="bi bi-heart"></i> Mis Favoritos</Link></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><Link className="dropdown-item" to="/">
                        <Button variant='outline-danger'  onClick={logOut}>
                          <i className="bi bi-door-closed-fill"></i> Cerrar sesión
                        </Button>
                      </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={'/login'} className="ms-2">
                <Button variant="success">Iniciar Sesión</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
