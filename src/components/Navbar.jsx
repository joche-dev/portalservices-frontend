import { NavLink, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Logo from "../assets/Logo";

const Navigation = () => {
  
  return (
    <Navbar expand="md" >
      <Container>
        <Navbar.Brand>
          <Link to="/" className="logo">
          <Logo w={"60"}/>
            Portal de Servicios
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-end align-items-md-center">
            <NavLink className={({isActive})=> isActive? 'link active' : 'link' } to={"/"}>
              Home
            </NavLink>
            <NavLink className={({isActive})=> isActive? 'link active' : 'link' } to={"/services"}>
              Servicios
            </NavLink>
            <Link to={"/login"}><Button variant="success ms-2">
              Iniciar Sesión</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
