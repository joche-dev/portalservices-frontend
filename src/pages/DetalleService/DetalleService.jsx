import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Button, Card, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../providers/UserProvider';
import IconGeolocation from '../../assets/IconGeolocation';
import IconEmail from '../../assets/IconEmail';
import IconPhone from '../../assets/IconPhone';
import './DetalleService.css'



export default function DetalleService() {

  const {id}= useParams();

  const { publicaciones } = useContext(UserContext);
  
  let publicacionDetail = publicaciones.filter((publicacion) => (publicacion.publicacionId==id));

  return (
    <div className='d-flex justify-content-center '>
      <Card key={publicacionDetail[0].publicacionId} border="light" className="d-flex justify-content-center text-center cardDetail gap-3 mt-5 flex-column flex-md-row align-items-md-top mx-auto">
      <Card.Img variant="top" src={publicacionDetail[0].imagen} />
      <Card.Body>
        <Card.Title>{publicacionDetail[0].titulo}</Card.Title>
        <Card.Subtitle className='mt-3'>{publicacionDetail[0].tiposervicio}</Card.Subtitle>
        <Card.Text>
        {publicacionDetail[0].contenido}
        </Card.Text>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <IconGeolocation />
          {publicacionDetail[0].comuna}, {publicacionDetail[0].ciudad}</ListGroup.Item>
        <ListGroup.Item>
          <IconEmail />
          {publicacionDetail[0].emailcontacto} </ListGroup.Item>
        <ListGroup.Item>
        <IconPhone />
          {publicacionDetail[0].telefonocontacto}</ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
      <Link to={"/services"}><Button variant="outline-secondary ms-2" size="sm">Volver</Button> </Link>
      </Card.Body>
    </Card>
    </div>
  )
}

