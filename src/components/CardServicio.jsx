import { Card, Button } from 'react-bootstrap';
import IconGeolocation from '../assets/IconGeolocation';
import { useNavigate } from 'react-router-dom';

export default function CardServicio({ publicacion }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{publicacion.titulo}</Card.Title>
        <Card.Text>{publicacion.tiposervicio}</Card.Text>
        <Card.Text>{publicacion.contenido}</Card.Text>
        <Card.Text>
          <span className="d-flex align-items-center">
            <IconGeolocation />
            {publicacion.comuna}, {publicacion.ciudad}
          </span>
          <Button variant="outline-secondary ms-2" size="sm" onClick={() => navigate(`/services/${publicacion.publicacionId}`)}>
            Más detalles
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
