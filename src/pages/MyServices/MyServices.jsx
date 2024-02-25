import { Container, Row, Col, Button } from 'react-bootstrap';

export default function MyServices() {

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
          {publicaciones.map((publicacion, id) => (
            <Col key={id}>
              <CardServicio publicacion={publicacion} />
            </Col>
          ))}
        </Row>
    </Container>
  )
}
