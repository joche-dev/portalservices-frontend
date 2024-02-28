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
              className={({ isActive }) => (isActive ? 'link active me-2' : 'link me-2')}
              to={'/services'}
            >
              Servicios
            </NavLink>
            {token && userLogin.nombre ? (
              <div className="dropdown d-flex flex-column align-items-end">
                <span data-bs-toggle="dropdown" aria-expanded="false">
                  Hola, {userLogin.nombre}
                  <ImgPerfil />
                </span>
              
                <ul className="dropdown-menu dropdown-menu-end text-center">
                  <li><a className="dropdown-item" href="#">Perfil</a></li>
                  <li><Link className="dropdown-item" to="/user/services">Mis Publicaciones</Link></li>
                  <li><a className="dropdown-item" href="#">Mis Favoritos</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><Button variant='outline-danger'  onClick={logOut}>Cerrar sesión</Button></a></li>
                </ul>
              </div>
            ) : (
              <Link to={'/login'}>
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
