import { Modal, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { UserContext } from '../providers/UserProvider';

export default function DeletePublicacion({ publicacionId }) {
  const { deletePublicacionUsuario } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const confirmDeletePost = () => {
    deletePublicacionUsuario(publicacionId);
    handleClose();
  };

  return (
    <>
      <Button
        variant="danger fs-7 d-block w-100"
        size="sm"
        onClick={handleShow}
      >
        Eliminar
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Desea eliminar la Publicación?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button variant="secondary px-3 me-2" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger px-4" onClick={confirmDeletePost}>
            Si
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
