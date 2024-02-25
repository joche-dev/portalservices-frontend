import { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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

    //verificar si los camos estan completados
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
    <Container className='d-flex justify-content-center gap-5 mt-5 flex-column flex-md-row align-items-md-center mx-auto'>
      <div className = 'd-flex flex-column align-items-center m-5 gap-2 justify-content-md-center'>
        <h1>Inicio de sesión.</h1>
        <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)} className='w-100 text-center'>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="example@example.com" onChange={(e) => inputHandler(e)}  className='w-100' required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" onChange={(e) => inputHandler(e)} className='w-100' required/>
          </Form.Group>
          <Button type='submit' variant="dark" size="sm" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
            {isLoading ? 'Loading…' : 'Iniciar sesión'}
          </Button>
        </Form>
          <p className='mt-1'>
            ¿No tiene una cuenta? <Link to={"/register"}><Button variant="outline-secondary ms-2" size="sm">Únete a nosotros</Button> </Link>
          </p>
          <Alert message={error} success={success} confirm={message} />
      </div>
      <div className='d-flex justify-content-center' >
        <img src="" alt="" style={{width:'15rem', backgroundColor: 'gray', height:'15rem'}}/>
      </div>
    </Container>
    
  )
}