import { Row, Col, Form, Button } from "react-bootstrap"
import { useRef, useState, useEffect } from "react";
import { useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";
import Alert from "../../components/Alert";

export default function Perfil() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^.{6,}$/;
  const { userLogin } = useContext(UserContext);
  const form = useRef();
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
    setUserLogin({ ...userLogin, [e.target.id]: e.target.value });
  }
  async function submitHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    //verificar si los camos estan completados
    if (
      !userLogin?.email ||
      !userLogin?.ciudad ||
      !userLogin?.comuna ||
      !userLogin?.nombre
    ) {
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(userLogin.email)) {
      // verificar el correo
      setError(
        'Por favor, introduce una dirección de correo electrónico válida.'
      );
      return;
    } else if (!passwordPattern.test(userLogin.contraseña)) {
      // verificar el correo
      setError('Por favor, introduce una contraseña de minimo 6 caracteres.');
      return;
    } else if (!userLogin.contraseña || !userLogin.contraseña1) {
      // verificar que los campos no esten vacios
      setError('Por favor, ingresa una contraseña.');
      return;
    } else if (userLogin.contraseña !== userLogin.contraseña1) {
      // verificar contraseñas iguales
      setError('Las contraseñas no coinciden.');
      return;
    }
  }
  return (
    <Row className="w-100 p-3 justify-content-center p-md-5 mx-auto"> 
      <Col xs={12} md={6} lg={4} className="d-flex flex-column text-center gap-2">
        <h1 className="fs-2">
          Editar perfil
        </h1>
        <Form
          ref={form}
          action="submit"
          onSubmit={(e) => submitHandler(e)}
          className="w-100 text-center"
        >
          <Form.Floating id="fotoperfil" className="mb-3">
            <Form.Control 
            type="file" 
            onChange={(e) => inputHandler(e)}/>
            <label htmlFor="fotoperfil">
            <i className="bi bi-card-image"></i> Foto de perfil
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="nombre"
              type="text"
              placeholder="Nombre completo"
              value={userLogin.nombre}
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
              value={userLogin.email}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="email">
              <i className="bi bi-envelope"></i> Correo electrónico
            </label>
          </Form.Floating>
          <Col className="d-flex gap-2">
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="ciudad"
              placeholder="Ciudad"
              value={userLogin.ciudad}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="ciudad">
              <i className="bi bi-geo-alt"></i> Ciudad
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="comuna"
              placeholder="Comuna"
              value={userLogin.comuna}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="comuna">
              <i className="bi bi-geo-alt"></i> Comuna
            </label>
          </Form.Floating>
          </Col>
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
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="direccion"
              placeholder="direccion"
              value={userLogin.direccion}
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="direccion">
              <i className="bi bi-geo-alt"></i> Dirección
            </label>
          </Form.Floating>
          <Button type="submit" variant="dark">
            Guardar
          </Button>
        </Form>
      </Col>
      <Alert message={error} success={success} confirm={message} />
    </Row>
  )
}
