import { useState, useRef, useEffect, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import { UserContext } from '../../providers/UserProvider';

export default function Login() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const form = useRef();
  const [user, setUser] = useState({});

  //usamos el context
  const { loginUsuario } = useContext(UserContext);

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
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  async function submitHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false); 

    //verificar si los campos estan completados
    if(!user?.formGroupEmail || !user?.formGroupPassword){
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(user.formGroupEmail)) {     // verificar el correo 
      setError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    }else{
      //await loginUsuario(user.formGroupEmail, user.formGroupPassword);
      setMessage('inicio de sesión exitoso!')
      setSuccess(true);
      form.current.reset();
    }
  }
  return (
    <Row className='w-100 justify-content-center p-3 p-md-5 mx-auto'>
      <Col xs={12} md={6} lg={4} className='text-center'>
        <h1>Iniciar sesión</h1>
        <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)} className='w-100 text-center'>
          <Form.Floating className="mb-3" >
            <Form.Control 
              type="email" 
              id="formGroupEmail" 
              placeholder="example@example.com" 
              onChange={(e) => inputHandler(e)}  
              className='w-100'/>
            <label htmlFor="formGroupEmail">
              <i className="bi bi-envelope"></i> Correo electrónico
            </label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control 
              type="password" 
              id="formGroupPassword" 
              placeholder="Password" 
              onChange={(e) => inputHandler(e)} 
              className='w-100'/>
            <label htmlFor="formGroupPassword">
              <i className="bi bi-key"></i> Contraseña
            </label>
          </Form.Floating>
          <Button type='submit' variant="dark">
            Iniciar sesión
          </Button>
        </Form>
          <p className='mt-3'>
            ¿No tiene una cuenta? <Link to={"/register"}>Únete a nosotros</Link>
          </p>
          <Alert message={error} success={success} confirm={message} />
      </Col>
      <Col xs={12} md={6} lg={4}>
        <img src="" alt="" style={{ width:'100%', height:'15rem', backgroundColor: 'gray'}}/>
      </Col>
    </Row>
  )
}