import { Container, Table } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import NewPublicacion from '../../components/NewPublicacion';
import UpdatePublicacion from '../../components/UpdatePublicacion';
import DeletePublicacion from '../../components/DeletePublicacion';

export default function MyServices() {
  const { userLogin, misPublicaciones, getPublicacionesUsuario } =
    useContext(UserContext);

  useEffect(() => {
    getPublicacionesUsuario();
  }, []);

  return (
    <Container className="py-3 py-md-4">
      <h1 className="mb-3">Mis Publicaciones</h1>
      <NewPublicacion usuario_id={userLogin.usuario_id} />
      <Table responsive hover className="table-myservices">
        <thead>
          <tr>
            <th className="col-1"></th>
            <th className="col-auto"></th>
            <th className="col-3 col-sm-1"></th>
          </tr>
        </thead>
        <tbody>
          {misPublicaciones && misPublicaciones.length > 0 ? (
            misPublicaciones.map((publicacion, index) => (
              <tr className="align-middle" key={index}>
                <td>
                  <img
                    src={publicacion.imagen}
                    alt="Foto Servicio"
                    className="d-block border"
                  />
                </td>
                <td>
                  <span className="d-block fw-semibold">
                    {publicacion.titulo}
                  </span>
                  <span className="d-block fs-7">
                    Tipo servicio: {publicacion.tipo_servicio}
                  </span>
                  <span className="fs-7">
                    Descripción: {publicacion.contenido}
                  </span>
                </td>
                <td>
                  <UpdatePublicacion publicacion={publicacion} />
                  <DeletePublicacion
                    publicacion_id={publicacion.publicacion_id}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay publicaciones disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
