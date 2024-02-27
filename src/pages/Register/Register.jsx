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
  const form = useRef();

    //usamos el context
    const {registerUsuario} = useContext(UserContext);
  
  function inputHandler(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };
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

    async function submitHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false); 

    //verificar si los camos estan completados
    if(!user?.Email || !user?.Password || !user?.Password1 || !user?.City || !user?.Comuna || !user?.Name ){
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(user.Email)) {     // verificar el correo 
      setError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    } else if (!passwordPattern.test(user.Password)) {     // verificar el correo 
      setError('Por favor, introduce una contraseña de minimo 6 caracteres.');
      return;
    }else if (!user.Password || !user.Password1) {  // verificar que los campos no esten vacios
      setError('Por favor, ingresa una contraseña.');
      return;
    } else if (user.Password !== user.Password1) { // verificar contraseñas iguales 
      setError('Las contraseñas no coinciden.');
      return;
    }else{
      console.log(user);
      //await registerUsuario(user.Name, user.Email, user.Password, user.City, user.Comuna );
      setMessage('Registro exitoso!');
      setSuccess(true);
      form.current.reset();
    }
  }


  return (
    <Row className='w-100 justify-content-center p-3 p-md-5 mx-auto'>
      <Col xs={12} md={6} lg={4} className='text-center'>
        <h1>Registrarse</h1>
        <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)} className='w-100 text-center'>
          <Form.Floating className="mb-3">
            <Form.Control 
              id="Name"
              type="text" 
              placeholder="Nombre completo" 
              onChange={(e) => inputHandler(e)} />
            <label htmlFor="Name">
              <i className="bi bi-person"></i> Nombre completo
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3" >
            <Form.Control 
              type="email" 
              id="Email" 
              placeholder="example@example.com" 
              onChange={(e) => inputHandler(e)} />
            <label htmlFor="Email">
              <i className="bi bi-envelope"></i> Correo electrónico
            </label>
          </Form.Floating>
            <Form.Floating className="mb-3" >
            <Form.Control 
              type="text" 
              id="City" 
              placeholder="Ciudad" 
              onChange={(e) => inputHandler(e)} />
            <label htmlFor="City">
              <i className="bi bi-geo-alt"></i> Ciudad
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3" >
            <Form.Control 
              type="text" 
              id="Comuna" 
              placeholder="Comuna" 
              onChange={(e) => inputHandler(e)} />
            <label htmlFor="Comuna">
              <i className="bi bi-geo-alt"></i> Comuna
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control 
              type="password" 
              id="Password" 
              placeholder="Password" 
              onChange={(e) => inputHandler(e)}/>
            <label htmlFor="Password">
              <i className="bi bi-key"></i> Contraseña
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3" >
            <Form.Control 
              type="password" 
              id="Password1" 
              placeholder="Confirmar Password" 
              onChange={(e) => inputHandler(e)}/>
            <label htmlFor="Password1">
              <i className="bi bi-key"></i> Confirmar Contraseña
            </label>
          </Form.Floating>
          <Button type='submit' variant="dark">
            Crear cuenta
          </Button>
        </Form>
        <p className='mt-3'>
          ¿Ya tienes una cuenta? <Link to={"/login"}>Iniciar sesión</Link> 
        </p>
        <Alert message={error} success={success} confirm={message} />
      </Col>
      <Col xs={12} md={6} lg={4} className='align-self-center'>
        <img src="" alt="" style={{ width:'100%', height:'15rem', backgroundColor: 'gray'}}/>
      </Col>
    </Row>
  )
}
