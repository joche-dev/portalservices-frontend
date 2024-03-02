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
        Nueva Publicación
      </Button>
      <Table responsive hover className="table-myservices">
        <thead>
          <tr>
            <th className="col-1"></th>
            <th className="col-auto"></th>
            <th className="col-3 col-sm-1"></th>
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
              <td>
                <span className="d-block fw-semibold">
                  {publicacion.titulo}
                </span>
                <span className="d-block fs-7">Tipo servicio: {publicacion.tiposervicio}</span>
                <span className="fs-7">Descripción: {publicacion.contenido}</span>
              </td>
              <td>
                <Button variant="secondary d-block w-100 fs-7 mb-1 me-2" size="sm">
                  Editar
                </Button>
                <Button
                  variant="danger fs-7 d-block w-100"
                  size="sm"
                  onClick={() =>
                    deletePublicacionesUsuario(publicacion.publicacionId)
                  }
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
