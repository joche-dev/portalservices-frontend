import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';
import Filtro from '../../components/Filtro.jsx';

export default function Services() {
  const { publicaciones, getPublicaciones, misPublicaciones } = useContext(UserContext);

  useEffect(() => {
    getPublicaciones();

  }, [misPublicaciones]);

  return (
    <Container className="py-3 py-md-4">
      <h1 className="text-center mb-3">Encuentra lo que necesitas</h1>
      <Filtro />
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
