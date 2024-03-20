import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { Container, Row, Col } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';

export default function MyFavorites() {
  const { misFavoritos, getFavoritosUsuario } = useContext(UserContext);

  useEffect(() => {
    getFavoritosUsuario();
    
  }, []);

  return (
    <Container className="py-3 py-md-4">
      <h1 className="mb-3">Mis Favoritos</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {misFavoritos?.length > 0 &&
          misFavoritos.map((publicacion, index) => (
            <Col key={index}>
              <CardServicio publicacion={publicacion} />
            </Col>
          ))}
      </Row>
      {!misFavoritos && (
        <p className="my-3">No hay publicaciones por mostrar.</p>
      )}
    </Container>
  );
}
