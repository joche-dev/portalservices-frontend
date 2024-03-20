import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';
import Filtro from '../../components/Filtro.jsx';

export default function Services() {
  const { publicaciones, getPublicaciones, misPublicaciones, respuesta, setPage } = useContext(UserContext);

  useEffect(() => {
    getPublicaciones();

  }, [misPublicaciones]);

  const siguiente = async () => {
    const page  = (respuesta.page)+1;
    setPage(page);
    getPublicaciones();
  }

  const anterior = async () => {
    const page  = (respuesta.page)-1;
    setPage(page);
    getPublicaciones();
  }

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
      <section className='d-flex justify-content-center w-50 mx-auto mt-3'>
        <Button 
          variant="secondary px-3 me-2 w-25"
          disabled={!respuesta.previous}
          onClick={() => (anterior())}>
            Anterior
          </Button>
          <Button 
            variant="secondary px-3 w-25"
            disabled={!respuesta.next || ((respuesta.page)+1 == respuesta.total_pages) }
            onClick={() => (siguiente())}
            >
            Siguiente
          </Button>
      </section>
      {publicaciones.length <= 0 && (
        <p className="my-3">No hay publicaciones por mostrar.</p>
      )}
    </Container>
  );
}
