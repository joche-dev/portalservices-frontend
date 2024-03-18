import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import DateFormat from '../../components/DateFormat'
import { useNavigate } from 'react-router-dom';



export default function DetalleService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { publicaciones, token, newFavorito, misFavoritos, deleteFavorito } = useContext(UserContext);

  const [publicacionDetail] = publicaciones.filter(
    (publicacion) => publicacion.publicacion_id == id
  );

  const guardarFavorito = async (usuario_id, publicacion_id) => {

    const encontrarFavorito = misFavoritos.find(
      (publicacion) => publicacion.publicacion_id == id
    );

    if(encontrarFavorito){
      const response = await deleteFavorito (encontrarFavorito.favorito_id);
      navigate(`/user/favorites`);
    }if(!encontrarFavorito){
      const response = await newFavorito (usuario_id, publicacion_id);
    }
  } 
  return (
    <Row className="w-100 justify-content-center p-3 mt-5 mx-auto">
      <Col xs={12} md={4} lg={4} className="p-0">
        <img
          src={publicacionDetail.imagen}
          alt="Foto del Servicio"
          className='detalleservice-img'
        />
      </Col>
      <Col xs={12} md={8} lg={7} className="d-flex flex-column p-0 p-md-3">
        <h5 className="d-flex justify-content-between my-2">
          <span className="fw-bolder">{publicacionDetail.titulo}</span>
          <span className="detalleservice-date fw-light">
            <DateFormat fechaOriginal={publicacionDetail.fecha_publicacion} />
          </span>
        </h5>
        <h6 className="fw-medium mb-3">{publicacionDetail.tipo_servicio}</h6>
        <p className="justify-content-start mb-3">
          {publicacionDetail.contenido}
        </p>
        <p className="detalle-contacto flex-lg-row gap-lg-3">
          <span className="justify-content-start">
            <i className="bi bi-geo-alt-fill pe-1"></i>
            {publicacionDetail.comuna}, {publicacionDetail.ciudad}
          </span>
          <Link
            to={'mailto:' + publicacionDetail.email_contacto}
            className="justify-content-start"
          >
            <i className="bi bi-envelope-fill pe-1"></i>
            {publicacionDetail.email_contacto}{' '}
          </Link>
          <Link
            to={
              'https://wa.me/' +
              publicacionDetail.telefono_contacto.replace(/[+\s]/g, '')
            }
            target="_blank"
            className="justify-content-start"
          >
            <i className="bi bi-whatsapp"></i>
            {publicacionDetail.telefono_contacto}
          </Link>
        </p>
        <div className="mt-3">
          {token && ( <Button variant="outline-primary me-3" onClick={()=>guardarFavorito(publicacionDetail.usuario_id, publicacionDetail.publicacion_id)}>
            <i className="bi bi-hand-thumbs-up-fill"></i> Me gusta
          </Button>)}
          <Link to={'/services'}>
            <Button variant="success">Volver</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
