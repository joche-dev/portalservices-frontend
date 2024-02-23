import './Home.css';
import IconGeolocation from '../../assets/IconGeolocation.jsx';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="home">
      <article className="d-flex flex-column flex-md-row mx-auto">
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
        <img className="w-100 w-md-50" src="" alt="" />
      </article>
      <article className="text-center mx-auto">
        <h1 className="">Últimos servicios subidos</h1>
        <p>Ingresa tu servicio o la de un vecino!</p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Col key={idx}>
              <Card >
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>Service title</Card.Title>
                  <Card.Text>Type service</Card.Text>
                  <Card.Text>
                    <span className="d-flex align-items-center">
                      <IconGeolocation />
                      Estacion Central, Santiago
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
