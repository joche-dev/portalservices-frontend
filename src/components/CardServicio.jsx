import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CardServicio({ publicacion }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Img variant="top" src={publicacion.imagen} />
      <Card.Body className="p-2">
        <Card.Title className="text-center">{publicacion.titulo}</Card.Title>
        <Card.Text>{publicacion.tiposervicio}</Card.Text>
        <Card.Text>{publicacion.contenido}</Card.Text>
      </Card.Body>
      <Card.Text className="card-footer">
        <span className="d-flex align-items-center">
          <i class="bi bi-geo-alt-fill"></i>
          {publicacion.comuna}, {publicacion.ciudad}
        </span>
        <Button
          variant="outline-secondary ms-2"
          size="sm"
          onClick={() => navigate(`/services/${publicacion.publicacionId}`)}
        >
          Más detalles
        </Button>
      </Card.Text>
    </Card>
  );
}
