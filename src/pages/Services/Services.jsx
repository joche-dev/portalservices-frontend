import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';

export default function Services() {
  const { publicaciones, getPublicaciones, misPublicaciones } = useContext(UserContext);

  useEffect(() => {
    getPublicaciones();

  }, [misPublicaciones]);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-3">Encuentra lo que necesitas</h1>
      <Row className="mb-3">
        <Col xs={12} md={7} className="mb-3">
          <Form.Floating>
            <Form.Control
              id="inputTituloEspecialidad"
              type="text"
              placeholder=""
            />
            <label htmlFor="inputTituloEspecialidad">
              <i className="bi bi-search"></i> Busca por titulo o Especialidad
            </label>
          </Form.Floating>
        </Col>
        <Col xs={12} md={2} className="mb-3">
          <Form.Floating className="m-0">
            <Form.Control id="inputCiudad" type="text" placeholder="" />
            <label htmlFor="inputComuna">
              <i className="bi bi-geo-alt"></i> Busca por Ciudad
            </label>
          </Form.Floating>
        </Col>
        <Col xs={12} md={2} className="mb-3">
          <Form.Floating>
            <Form.Control id="inputComuna" type="text" placeholder="" />
            <label htmlFor="inputComuna">
              <i className="bi bi-geo-alt"></i> Busca por Comuna
            </label>
          </Form.Floating>
        </Col>
        <Col xs={12} md="auto" className="mb-3 mb-md-0">
          <Button variant="success w-100 p-3">Enviar</Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-4">
        {publicaciones.length > 0 &&
          publicaciones.map((publicacion, index) => (
            <Col key={index}>
              <CardServicio publicacion={publicacion} />
            </Col>
          ))}
      </Row>
      {publicaciones.length <= 0 && (
        <p className="my-3">No hay publicaciones por mostrar.</p>
      )}
    </Container>
  );
}
