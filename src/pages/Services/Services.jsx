import { useContext, useEffect, useState, useMemo } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CardServicio from '../../components/CardServicio.jsx';
import Filtro from '../../components/Filtro.jsx';

export default function Services() {
  const {
    publicaciones = [],
    getPublicaciones,
    misPublicaciones,
    respuesta = {},
  } = useContext(UserContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPublicaciones(page);
  }, [misPublicaciones, page]);

  const siguiente = () => setPage((prevPage) => prevPage + 1);
  const anterior = () => setPage((prevPage) => Math.max(1, prevPage - 1));

  const publicacionesRender = useMemo(() => {
    return publicaciones.length > 0 ? (
      publicaciones.map((publicacion, index) => (
        <Col key={index}>
          <CardServicio publicacion={publicacion} />
        </Col>
      ))
    ) : (
      <p className="my-3 text-center">No hay publicaciones por mostrar.</p>
    );
  }, [publicaciones]);

  return (
    <Container className="py-3 py-md-4">
      <h1 className="text-center mb-3">Encuentra lo que necesitas</h1>
      <Filtro />
      <Row xs={1} md={2} lg={4} className="g-4">
        {publicacionesRender}
      </Row>
      <section className="d-flex justify-content-center w-50 mx-auto mt-5">
        <Button
          size="sm"
          variant="secondary px-3 me-2"
          disabled={!respuesta.previous}
          onClick={anterior}
        >
          Anterior
        </Button>
        <Button
          size="sm"
          variant="secondary px-3"
          disabled={
            !respuesta.next ||
            (respuesta.page ?? 1) + 1 > (respuesta.total_pages ?? 1)
          }
          onClick={siguiente}
        >
          Siguiente
        </Button>
      </section>
    </Container>
  );
}
