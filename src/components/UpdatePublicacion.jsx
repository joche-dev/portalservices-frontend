import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider';
import Alert from './Alert';

export default function UpdatePublicacion({ publicacion }) {
  const {
    updatePublicacionUsuario,
    getPublicacionesUsuario,
    misPublicaciones,
  } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [updatePost, setUpdatePost] = useState(publicacion);
  const [statusImg, setStatusImg] = useState({ ok: false, msg: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const form = useRef();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePatten = /^\+56\d{9}$/;

  const handleClose = () => {
    setStatusImg({ ok: false, msg: '' });
    setShow(false)
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    setUpdatePost(publicacion);
  }, [misPublicaciones]);

  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [error, success]);

  function inputHandler(e) {
    e.preventDefault();
    setUpdatePost({ ...updatePost, [e.target.id]: e.target.value });
  }

  const uploadImg = async (e) => {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'portal_services');
      setStatusImg({ ok: false, msg: 'Subiendo imagen a la web.' });
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dk3wqmcdo/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      if(res.ok){
        const imgUrl = await res.json();
        setStatusImg({ ok: true, msg: 'Imagen subida a la web.' });
        setUpdatePost({ ...updatePost, imagen: imgUrl.secure_url });
      } else {
        setStatusImg({
          ok: false,
          msg: 'No se pudo subir la imagen a la web.',
        });
      }

    } catch (error) {
      setStatusImg({
        ok: false,
        msg: 'No se pudo subir la imagen a la web.',
      });
    }
  };

  async function submitHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    //verificar si los camos estan completados
    if (
      !updatePost?.titulo ||
      !updatePost?.tipo_servicio ||
      !updatePost?.contenido ||
      !updatePost?.email_contacto ||
      !updatePost?.telefono_contacto ||
      !updatePost?.ciudad ||
      !updatePost?.comuna
    ) {
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(updatePost.email_contacto)) {
      // verificar el correo
      setError(
        'Por favor, introduce una dirección de correo electrónico válida.'
      );
      return;
    } else if (!phonePatten.test(updatePost.telefono_contacto)) {
      setError('Por favor, introduce un telefono valido. Ej: +56912345678');
      return;
    }

    const data = await updatePublicacionUsuario(updatePost);
    if (data.ok) {
      setMessage('Registro exitoso!');
      setSuccess(true);
      await getPublicacionesUsuario();
      form.current.reset();
      setStatusImg({ ok: false, msg: '' });
      handleClose();
    }
  }

  return (
    <>
      <Button
        variant="secondary d-block w-100 fs-7 mb-1 me-2"
        size="sm"
        onClick={handleShow}
      >
        Editar
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
          <Modal.Title>Editar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)}>
            <Form.Floating>
              <Form.Control
                id="imagen"
                type="file"
                onChange={uploadImg}
                accept=".jpg, .jpeg, .png"
              />
              <label htmlFor="imagen">
                <i className="bi bi-card-image"></i> Foto del Servicio
              </label>
            </Form.Floating>
            <p
              className={`${
                statusImg.ok
                  ? 'text-success ps-2 mb-3'
                  : 'text-danger ps-2 mb-3'
              }`}
            >
              {statusImg.msg}
            </p>
            <Form.Floating className="mb-3">
              <Form.Control
                id="titulo"
                type="text"
                placeholder="Titulo del Servicio"
                value={updatePost.titulo}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="titulo">
                <i className="bi bi-gear"></i> Titulo del Servicio
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="tiposervicio"
                type="text"
                placeholder="Tipo Servicio"
                value={updatePost.tipo_servicio}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="tiposervicio">
                <i className="bi bi-gear"></i> Tipo Servicio
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="contenido"
                as="textarea"
                placeholder="Descripción"
                value={updatePost.contenido}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="contenido">
                <i className="bi bi-card-text"></i> Descripción
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                id="emailcontacto"
                placeholder="example@example.com"
                value={updatePost.email_contacto}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="emailcontacto">
                <i className="bi bi-envelope"></i> Email de Contacto
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="telefonocontacto"
                placeholder="example@example.com"
                value={updatePost.telefono_contacto}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="telefonocontacto">
                <i className="bi bi-phone"></i> Telefono de Contacto
              </label>
            </Form.Floating>
            <div className="d-flex gap-2">
              <Form.Floating className="w-50 mb-3">
                <Form.Control
                  type="text"
                  id="ciudad"
                  placeholder="Ciudad"
                  value={updatePost.ciudad}
                  onChange={(e) => inputHandler(e)}
                />
                <label htmlFor="ciudad">
                  <i className="bi bi-geo-alt"></i> Ciudad
                </label>
              </Form.Floating>
              <Form.Floating className="w-50 mb-3">
                <Form.Control
                  type="text"
                  id="comuna"
                  placeholder="Comuna"
                  value={updatePost.comuna}
                  onChange={(e) => inputHandler(e)}
                />
                <label htmlFor="comuna">
                  <i className="bi bi-geo-alt"></i> Comuna
                </label>
              </Form.Floating>
            </div>
            <div className="text-end">
              <Button variant="secondary me-2 mb-3" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="success mb-3" type="submit">
                Guardar
              </Button>
            </div>
            <Alert message={error} success={success} confirm={message} />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
