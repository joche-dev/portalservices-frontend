import { Container } from 'react-bootstrap';
import Logo from '../assets/Logo.jsx';
import IconFacebook from '../assets/IconFacebook.jsx';
import IconLinkedin from '../assets/IconLinkedin.jsx'
import IconYoutube from '../assets/IconYoutube.jsx'

export default function Footer() {
  return (
    <Container className="footer flex-md-row justify-content-md-between">
      <h5 className='logo'>
        <Logo w={'24'} />
        Portal de Servicios
      </h5>
      <span>contacto@portalservicios.com</span>
      <span className='social-icon'>
        <IconFacebook />
        <IconLinkedin />
        <IconYoutube />
      </span>
    </Container>
  );
}
