import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const Navigation = () => {
  const { token, logout } = useContext(UserContext);

  return (
    <Navbar expand="sm" >
      <Container className='justify-content-between'>
        <Navbar.Brand>
          <Link
            to="/"
            className="text-decoration-none p-2"
          >
            Portal de Servicios
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link
            to="/services"
            className="text-decoration-none p-2"
          >
            Servicios
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Link to="/login">
              <Button variant="success" className='me-2'>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
