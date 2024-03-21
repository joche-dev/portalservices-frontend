import { Row, Col, Form, Button } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import Alert from '../../components/Alert';

export default function Perfil() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^.{6,}$/;
  const form = useRef();
  const { userLogin, setUserLogin, updateProfileUser } = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState({
    ...userLogin,
    contraseña1: userLogin.contraseña, 
    direccion: ''
  });
  const [regiones, setRegiones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  //useEffect Alert
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
    setUpdateUser({ ...updateUser, [e.target.id]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    //verificar si los camos estan completados
    if (
      !updateUser?.email ||
      !updateUser?.ciudad ||
      !updateUser?.comuna ||
      !updateUser?.nombre
    ) {
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(updateUser.email)) {
      // verificar el correo
      setError(
        'Por favor, introduce una dirección de correo electrónico válida.'
      );
      return;
    } else if (!passwordPattern.test(updateUser.contraseña)) {
      // verificar el correo
      setError('Por favor, introduce una contraseña de minimo 6 caracteres.');
      return;
    } else if (!updateUser.contraseña || !updateUser.contraseña1) {
      // verificar que los campos no esten vacios
      setError('Por favor, ingresa una contraseña.');
      return;
    } else if (updateUser.contraseña !== updateUser.contraseña1) {
      // verificar contraseñas iguales
      setError('Las contraseñas no coinciden.');
      return;
    }
    const result = await updateProfileUser(updateUser)
    if(result.ok){
      setMessage('Actualización del usuario exitoso.');
      setSuccess(true);
      setUserLogin(updateUser);
    }else {
      setError('Actualización del usuario fallido.');
      return;
    }
  }

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
    setUpdateUser({ ...updateUser, ciudad: e.target.value });
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
    setUpdateUser({ ...updateUser, comuna: e.target.value });
  };


  return (
    <Row className="w-100 p-3 justify-content-center p-md-5 mx-auto">
      <Col
        xs={12}
        md={6}
        lg={4}
        className="d-flex flex-column text-center gap-2"
      >
        <h1>Editar perfil</h1>
        <Form
          ref={form}
          action="submit"
          onSubmit={(e) => submitHandler(e)}
          className="w-100 text-center"
        >
          <Form.Floating className="mb-3">
            <Form.Control
              id="nombre"
              type="text"
              placeholder="Nombre completo"
              value={updateUser.nombre}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="nombre">
              <i className="bi bi-person"></i> Nombre completo
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="example@example.com"
              value={updateUser.email}
              disabled
            />
            <label htmlFor="email">
              <i className="bi bi-envelope"></i> Correo electrónico
            </label>
          </Form.Floating>
            <Form.Floating className="mb-3">
            <Form.Select
                id="ciudad"
                value={selectedRegion}
                onChange={(e) => {handleRegionChange(e)}}
              >
              <option value={updateUser.ciudad}>{updateUser.ciudad}</option>
                {regiones.map((region, index) => (
              <option key={index} value={region.name}>
                {region.name}
              </option>
            ))}
          </Form.Select>
          <label htmlFor="ciudad">
            <i className="bi bi-geo-alt"></i> Región
          </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
            <Form.Select
                id="comuna"
                value={selectedCommune}
                onChange={(e)=>{handleCommuneChange(e)}}
                disabled={!selectedRegion}
              >
              <option value={updateUser.comuna}>{updateUser.comuna}</option>
              {comunas.map((commune) => (
              <option key={commune} value={commune}>
                {commune}
              </option>
            ))}
          </Form.Select>
          <label htmlFor="comuna">
            <i className="bi bi-geo-alt"></i> Comuna
          </label>
            </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="contraseña"
              placeholder="Password"
              value={updateUser.contraseña}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="contraseña">
              <i className="bi bi-key"></i> Nueva Contraseña
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="contraseña1"
              placeholder="Confirmar Password"
              value={updateUser.contraseña1}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="contraseña1">
              <i className="bi bi-key"></i> Confirmar Nueva Contraseña
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="direccion"
              placeholder="direccion"
              value={updateUser.direccion}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="direccion">
              <i className="bi bi-geo-alt"></i> Dirección
            </label>
          </Form.Floating>
          <Button type="submit" variant="dark mb-3">
            Guardar
          </Button>
        </Form>
        <Alert message={error} success={success} confirm={message} />
      </Col>
    </Row>
  );
}
