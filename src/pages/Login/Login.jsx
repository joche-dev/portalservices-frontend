import { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';

export default function Login() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const form = useRef();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  //useEffect boton loading
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

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

  function submitHandler(e) {
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
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="example@example.com" onChange={(e) => inputHandler(e)}  className='w-100' required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" onChange={(e) => inputHandler(e)} className='w-100' required/>
          </Form.Group>
          <Button type='submit' variant="dark" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
            {isLoading ? 'Loading…' : 'Iniciar sesión'}
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