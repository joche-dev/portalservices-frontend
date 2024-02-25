import './Home.css';

import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';

export default function Home() {
  const { publicaciones } = useContext(UserContext);

  return (
    <Container className="home">
      <article className="d-flex flex-column flex-md-row align-items-md-center mx-auto">
        <div className="d-flex flex-column justify-content-center w-100 w-md-50 p-3">
          <h1 className="fw-bolder">
            Aquí podras encontrar todo tipo de servicios
          </h1>
          <p>
            ¡Colabora con tus vecinos! Regístrate y comparte los servicios de
            personas de confianza que conozcas, como gasfitería, electricidad,
            carpintería, banquetería, actividades para niños, ¡y mucho más!
          </p>
          <Link to={'/register'}>
            <Button variant="success">Únetenos ahora</Button>
          </Link>
        </div>
        <img className="home-img w-100 w-md-50" src="" alt="" />
      </article>
      <article className="text-center mx-auto">
        <h1 className="">Últimos servicios subidos</h1>
        <p>Ingresa tu servicio o la de un vecino!</p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {publicaciones.slice(-3).map((publicacion, id) => (
            <Col key={id}>
              <CardServicio publicacion={publicacion} />
            </Col>
          ))}
        </Row>
      </article>
    </Container>
  );
}
