import './Home.css';
import IconGeolocation from '../../assets/IconGeolocation.jsx';

import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


export default function Home() {
  const {publicaciones} = useContext(UserContext);
  console.log(publicaciones);

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
          {publicaciones.slice(-3).map((publicacion, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>{publicacion.titulo}</Card.Title>
                  <Card.Text>{publicacion.tiposervicio}</Card.Text>
                  <Card.Text>{publicacion.contenido}</Card.Text>
                  <Card.Text>
                    <span className="d-flex align-items-center">
                      <IconGeolocation />
                      {publicacion.comuna}, {publicacion.ciudad}
                    </span>
                    <Button variant="outline-secondary ms-2" size="sm">
                      Más detalles
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </article>
    </Container>
  );
}
