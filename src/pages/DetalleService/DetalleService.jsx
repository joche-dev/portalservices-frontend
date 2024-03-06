import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import './DetalleService.css';

export default function DetalleService() {
  const { id } = useParams();
  const { publicaciones } = useContext(UserContext);

  const [publicacionDetail] = publicaciones.filter(
    (publicacion) => publicacion.publicacionId == id
  );

  return (
    <Row className="w-100 justify-content-center p-3 mt-5 mx-auto">
      <Col xs={12} md={4} lg={4} className="p-0">
        <img
          src={publicacionDetail.imagen}
          alt=""
          style={{ width: '100%', height: '20rem', backgroundColor: 'gray' }}
        />
      </Col>
      <Col xs={12} md={8} lg={7} className="d-flex flex-column p-0 p-md-3">
        <h5 className="d-flex justify-content-between my-2">
          <span className="fw-bolder">{publicacionDetail.titulo}</span>
          <span className="card-date fw-light">
            {publicacionDetail.fechapublicacion}
          </span>
        </h5>
        <h6 className="fw-medium mb-3">{publicacionDetail.tiposervicio}</h6>
        <p className="justify-content-start mb-3">
          {publicacionDetail.contenido}
        </p>
        <p className="detalle-contacto flex-lg-row gap-lg-3">
          <span className="justify-content-start">
            <i className="bi bi-geo-alt-fill pe-1"></i>
            {publicacionDetail.comuna}, {publicacionDetail.ciudad}
          </span>
          <Link
            to={'mailto:' + publicacionDetail.emailcontacto}
            className="justify-content-start"
          >
            <i className="bi bi-envelope-fill pe-1"></i>
            {publicacionDetail.emailcontacto}{' '}
          </Link>
          <Link
            to={
              'https://wa.me/' +
              publicacionDetail.telefonocontacto.replace(/[+\s]/g, '')
            }
            target="_blank"
            className="justify-content-start"
          >
            <i className="bi bi-whatsapp"></i>
            {publicacionDetail.telefonocontacto}
          </Link>
        </p>
        <div className="mt-3">
          <Button variant="outline-primary me-3">
            <i className="bi bi-hand-thumbs-up-fill"></i> Me gusta
          </Button>
          <Link to={'/services'}>
            <Button variant="success">Volver</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
