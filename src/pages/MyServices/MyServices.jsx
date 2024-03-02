import { Container, Table, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';

export default function MyServices() {
  const { getPublicacionesUsuario, deletePublicacionesUsuario } =
    useContext(UserContext);
  const [misPublicaciones, setMisPublicaciones] = useState(
    getPublicacionesUsuario
  );

  useEffect(() => {
    setMisPublicaciones(getPublicacionesUsuario);
  }, [getPublicacionesUsuario]);

  return (
    <Container className="p-3 p-md-5">
      <Button variant="success mb-3">
        <i className="bi bi-plus-circle"></i> Nueva Publicación
      </Button>
      <Table responsive>
        <thead>
          <tr>
            <th className="col-1">Imagen</th>
            <th className="col-5">Titulo</th>
            <th className="col-4">Tipo</th>
            <th className="col-2"></th>
          </tr>
        </thead>
        <tbody>
          {misPublicaciones.map((publicacion, index) => (
            <tr className="align-middle" key={index}>
              <td>
                <img
                  src={publicacion.imagen}
                  alt="Foto Servicio"
                  className="d-block border"
                  style={{ width: '4rem', height: '4rem' }}
                />
              </td>
              <td>{publicacion.titulo}</td>
              <td>{publicacion.tiposervicio}</td>
              <td>
                <Button variant="secondary me-2" size="sm">
                  <i className="bi bi-arrow-repeat"></i> Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    deletePublicacionesUsuario(publicacion.publicacionId)
                  }
                >
                  <i className="bi bi-trash"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
