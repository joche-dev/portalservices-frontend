import { useState, useRef, useEffect, useContext } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import { UserContext } from '../../providers/UserProvider';

export default function Register() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^.{6,}$/;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [regiones, setRegiones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');
  const form = useRef();

  //usamos el context
  const { registerUsuario } = useContext(UserContext);

  function inputHandler(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  }
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
    setUser({ ...user, ciudad: e.target.value });
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
    setUser({ ...user, comuna: e.target.value });
  };

  async function submitHandler(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    //verificar si los camos estan completados
    if (
      !user?.email ||
      !user?.contraseña ||
      !user?.contraseña1 ||
      !user?.ciudad ||
      !user?.comuna ||
      !user?.nombre
    ) {
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(user.email)) {
      // verificar el correo
      setError(
        'Por favor, introduce una dirección de correo electrónico válida.'
      );
      return;
    } else if (!passwordPattern.test(user.contraseña)) {
      // verificar el correo
      setError('Por favor, introduce una contraseña de minimo 6 caracteres.');
      return;
    } else if (!user.contraseña || !user.contraseña1) {
      // verificar que los campos no esten vacios
      setError('Por favor, ingresa una contraseña.');
      return;
    } else if (user.contraseña !== user.contraseña1) {
      // verificar contraseñas iguales
      setError('Las contraseñas no coinciden.');
      return;
    } else {
      const data = await registerUsuario(user);
      if (data.ok) {
        setMessage(data.message);
        setSuccess(true);
        form.current.reset();
      }else{
        setError('Email ya registrado!');
        return;
      }
    }
  }

  return (
    <Row className="w-100 justify-content-center p-3 p-md-5 mx-auto">
      <Col xs={12} md={6} lg={4} className="text-center">
        <h1>Registrarse</h1>
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
              onChange={(e) => inputHandler(e)}
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
              <option value="">Region</option>
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
              <option value="">Comuna</option>
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
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="contraseña">
              <i className="bi bi-key"></i> Contraseña
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="contraseña1"
              placeholder="Confirmar Password"
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="contraseña1">
              <i className="bi bi-key"></i> Confirmar Contraseña
            </label>
          </Form.Floating>
          <Button type="submit" variant="dark">
            Crear cuenta
          </Button>
        </Form>
        <p className="mt-3">
          ¿Ya tienes una cuenta? <Link to={'/login'}>Iniciar sesión</Link>
        </p>
        <Alert message={error} success={success} confirm={message} />
      </Col>
      <Col xs={12} md={6} lg={4}>
        <img
          src="./register.jpg"
          alt="Foto de manos entrelazadas"
          className=' mt-md-5 rounded w-100 h-75'
          // style={{ width: '100%', height: '15rem' }}
        />
      </Col>
    </Row>
  );
}
