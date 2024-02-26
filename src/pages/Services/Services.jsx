import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Container, Form, Row, Col } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';

export default function Services() {
  const { publicaciones } = useContext(UserContext);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-3">Encuentra lo que necesitas</h1>
      <Row className="mb-3">
        <Col xs={12} md={6}>
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
        <Col xs={12} md={3}>
          <Form.Floating>
            <Form.Control id="inputCiudad" type="text" placeholder="" />
            <label htmlFor="inputCiudad">
              <i className="bi bi-geo-alt"></i> Busca por Ciudad
            </label>
          </Form.Floating>
        </Col>
        <Col xs={12} md={3}>
          <Form.Floating>
            <Form.Control id="inputComuna" type="text" placeholder="" />
            <label htmlFor="inputComuna">
              <i className="bi bi-geo-alt"></i> Busca por Comuna
            </label>
          </Form.Floating>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-4">
        {publicaciones.map((publicacion, id) => (
          <Col key={id}>
            <CardServicio publicacion={publicacion} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
