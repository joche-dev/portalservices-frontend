import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import DateFormat from '../../components/DateFormat';

export default function DetalleService() {
  const { id } = useParams();
  const { token, getPublicacion, getFavoritosUsuario, newFavorito, deleteFavorito } = useContext(UserContext);
  const [publicacion, setPublicacion] = useState({
    imagen: '',
    titulo: '',
    fecha_publicacion: '',
    tipo_servicio: '',
    contenido: '',
    ciudad: '',
    comuna: '',
    email_contacto: '',
    telefono_contacto: '',
  });
  const [stateBtn, setStateBtn] = useState(false)
  const [favoritoId, setFavoritoId] = useState(null);


  const addFavorito = async (usuario_id, publicacion_id) => {
    setStateBtn(true)
    const response = await newFavorito(usuario_id, publicacion_id);
    if(response){
      setFavoritoId(response.favorito_id);
    }
    setStateBtn(false)
  };

  const removeFavorito = async (favoritoId) => {
    setStateBtn(true)
    const response = await deleteFavorito(favoritoId);
    if(response.ok){
      setFavoritoId(null);
    }
    setStateBtn(false)
  };

  useEffect(() => {
    getPublicacion(id)
      .then((publicacion) => {
        setPublicacion(publicacion);
        return publicacion;
      })
      .then((publicacion) => {
        getFavoritosUsuario()
          .then((res) => {
            let resultado = res.find(
              (fav) => fav.publicacion_id === publicacion.publicacion_id
            );
            setFavoritoId(resultado.favorito_id);
          })
          .catch((err) => console.log(err));
      });
  }, []);

  return (
    <Row className="w-100 justify-content-center p-3 mt-5 mx-auto">
      <Col xs={12} md={4} lg={4} className="p-0">
        <img
          src={publicacion?.imagen}
          alt="Foto del Servicio"
          className="detalleservice-img"
        />
      </Col>
      <Col xs={12} md={8} lg={7} className="d-flex flex-column p-0 p-md-3">
        <h5 className="d-flex justify-content-between my-2">
          <span className="fw-bolder">{publicacion?.titulo}</span>
          <span className="detalleservice-date fw-light">
            <DateFormat fechaOriginal={publicacion?.fecha_publicacion} />
          </span>
        </h5>
        <h6 className="fw-medium mb-3">{publicacion?.tipo_servicio}</h6>
        <p className="justify-content-start mb-3">{publicacion?.contenido}</p>
        <p className="detalle-contacto flex-lg-row gap-lg-3">
          <span className="justify-content-start">
            <i className="bi bi-geo-alt-fill pe-1"></i>
            {publicacion?.comuna}, {publicacion?.ciudad}
          </span>
          <Link
            to={'mailto:' + publicacion?.email_contacto}
            className="justify-content-start"
          >
            <i className="bi bi-envelope-fill pe-1"></i>
            {publicacion?.email_contacto}{' '}
          </Link>
          <Link
            to={
              'https://wa.me/' +
              publicacion?.telefono_contacto.replace(/[+\s]/g, '')
            }
            target="_blank"
            className="justify-content-start"
          >
            <i className="bi bi-whatsapp"></i>
            {publicacion?.telefono_contacto}
          </Link>
        </p>
        <div className="mt-3">
          {token && !favoritoId ? (
            <Button variant="outline-danger me-3" onClick={() => addFavorito(publicacion?.usuario_id, publicacion?.publicacion_id)}
              disabled={stateBtn}>
              <i className="bi bi-heart-fill"></i> Agregar Favorito
            </Button>
          ) : (
            <Button variant="outline-danger me-3" onClick={() => removeFavorito(favoritoId)} 
              disabled={stateBtn}>
              <i className="bi bi-heartbreak-fill"></i> Remover Favorito
            </Button>
          )}
          <Link to={'/services'}>
            <Button variant="success">Volver</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
