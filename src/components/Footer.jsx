import { Container } from 'react-bootstrap';
import Logo from '../assets/Logo.jsx';

export default function Footer() {
  return (
    <Container className="footer flex-md-row justify-content-md-between">
      <h5 className='logo'>
        <Logo w={'24'} />
        Portal de Servicios
      </h5>
      <span>contacto@portalservicios.com</span>
      <span className='social-icon'>
        <i className="bi bi-whatsapp"></i>
        <i className="bi bi-facebook"></i>
        <i className="bi bi-linkedin"></i>
      </span>
    </Container>
  );
}
