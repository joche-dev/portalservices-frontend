import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider';
import Alert from './Alert';

export default function NewPublicacion({ usuario_id }) {
  const { newPublicacionUsuario, getPublicacionesUsuario } =
    useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({ usuario_id });
  const [statusImg, setStatusImg] = useState({ ok: false, msg: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [regiones, setRegiones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');
  const form = useRef();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePatten = /^\+56\d{9}$/;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/chilean-locations.json');
        const data = await response.json();
        setRegiones(data.regiones);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleRegionChange = (e) => {
    e.preventDefault();
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    setNewPost({ ...newPost, ciudad: e.target.value });
    // Filtrar las comunas correspondientes a la región seleccionada
    const selectedRegionData = regiones.find(
      (region) => region.name === selectedRegion
    );
    if (selectedRegionData) {
      setComunas(selectedRegionData.comunas);
    } else {
      setComunas([]);
    }
    setSelectedCommune('');
  };

  const handleCommuneChange = (e) => {
    e.preventDefault();
    setSelectedCommune(e.target.value);
    setNewPost({ ...newPost, comuna: e.target.value });
  };


  const handleClose = () => {
    setNewPost({ usuario_id });
    setStatusImg({ ok: false, msg: '' });
    setSelectedRegion('');
    setSelectedCommune('');
    form.current.reset();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  }

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
    setNewPost({ ...newPost, [e.target.id]: e.target.value });
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
        setNewPost({ ...newPost, imagen: imgUrl.secure_url });
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
    console.log('Este es el new Post:', newPost);
    //verificar si los camos estan completados
    if (
      !newPost?.imagen ||
      !newPost?.titulo ||
      !newPost?.tipo_servicio ||
      !newPost?.contenido ||
      !newPost?.email_contacto ||
      !newPost?.telefono_contacto ||
      !newPost?.ciudad ||
      !newPost?.comuna
    ) {
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(newPost.email_contacto)) {
      setError(
        'Por favor, introduce una dirección de correo electrónico válida.'
      );
      return;
    } else if (!phonePatten.test(newPost.telefono_contacto)) {
      setError('Por favor, introduce un telefono valido. Ej: +56912345678');
      return;
    } else if (newPost.imagen === '') {
      setError('Falta cargar la imagen.');
      return;
    }

    const data = await newPublicacionUsuario(newPost);
    if (data.ok) {
      setMessage('Registro exitoso!');
      setSuccess(true);
      await getPublicacionesUsuario();
      form.current.reset();
      setNewPost({ usuario_id });
      setStatusImg({ ok: false, msg: '' });
      handleClose();
    }
  }

  return (
    <>
      <Button variant="success mb-3" onClick={handleShow}>
        Nueva Publicación
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
          <Modal.Title>Nueva Publicación</Modal.Title>
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
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="titulo">
                <i className="bi bi-gear"></i> Titulo del Servicio
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="tipo_servicio"
                type="text"
                placeholder="Tipo Servicio"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="tipo_servicio">
                <i className="bi bi-gear"></i> Tipo Servicio
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="contenido"
                as="textarea"
                placeholder="Descripción"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="contenido">
                <i className="bi bi-card-text"></i> Descripción
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                id="email_contacto"
                placeholder="example@example.com"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="email_contacto">
                <i className="bi bi-envelope"></i> Email de Contacto
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="telefono_contacto"
                placeholder="example@example.com"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="telefono_contacto">
                <i className="bi bi-phone"></i> Telefono de Contacto
              </label>
            </Form.Floating>
            <div className="d-flex gap-2">
              <Form.Floating className="w-50 mb-3">
              <Form.Select
                id="ciudad"
                value={selectedRegion}
                onChange={(e) => {handleRegionChange(e)}}
              >
              <option value="">Region</option>
                {regiones.map((region, index) => (
              <option key={index} value={region.name}>
                {region.name}
              </option>
            ))}
          </Form.Select>
          <label htmlFor="ciudad">
            <i className="bi bi-geo-alt"></i> Busca por
          </label>
              </Form.Floating>
              <Form.Floating className="w-50 mb-3">
              <Form.Select
                id="comuna"
                value={selectedCommune}
                onChange={(e)=>{handleCommuneChange(e)}}
                disabled={!selectedRegion}
              >
              <option value="">Comuna</option>
              {comunas.map((commune) => (
              <option key={commune} value={commune}>
                {commune}
              </option>
            ))}
          </Form.Select>
          <label htmlFor="comuna">
            <i className="bi bi-geo-alt"></i> Busca por
          </label>
              </Form.Floating>
            </div>
            <div className="text-end">
              <Button variant="secondary me-2 mb-3" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                variant="success mb-3"
                type="submit"
                disabled={statusImg.ok ? false : true}
              >
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
