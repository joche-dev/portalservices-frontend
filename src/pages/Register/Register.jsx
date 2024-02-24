import { Container } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';

export default function Register() {

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const form = useRef();

  function inputHandler(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  function submitHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false); 

    //verificar si los camos estan completados
    if(!user?.formGroupEmail || !user?.formGroupPassword || !user?.formGroupPassword1 || !user?.formGroupCity || !user?.formGroupComuna || !user?.formGroupName ){
      setError('Faltan campos obligatorios por llenar.');
      return;
    } else if (!emailPattern.test(user.formGroupEmail)) {     // verificar el correo 
      setError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    }else if (!user.formGroupPassword || !user.formGroupPassword1) {  // verificar que los campos no esten vacios
      setError('Por favor, ingresa una contraseña.');
      return;
    } else if (user.formGroupPassword !== user.formGroupPassword1) { // verificar contraseñas iguales 
      setError('Las contraseñas no coinciden.');
      return;
    }else{
      setMessage('Registro exitoso!')
      setSuccess(true);
      form.current.reset();
    }
  }


  return (
    <Container className='d-flex justify-content-center gap-5 mt-5 flex-column flex-md-row align-items-md-center mx-auto'>
      <div className = 'd-flex flex-column align-items-center m-5 gap-2'>
        <h1>Registrarse.</h1>
        <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)} className='w-100 text-center'>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Control type="text" placeholder="Nombre completo" onChange={(e) => inputHandler(e)} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="example@example.com" onChange={(e) => inputHandler(e)} required/>
          </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupCity">
            <Form.Control type="text" placeholder="Ciudad" onChange={(e) => inputHandler(e)} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupComuna">
            <Form.Control type="text" placeholder="Comuna" onChange={(e) => inputHandler(e)} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" onChange={(e) => inputHandler(e)} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword1">
            <Form.Control type="password" placeholder="Confirmar Password" onChange={(e) => inputHandler(e)} required/>
          </Form.Group>
          <Button type='submit' variant="dark">registrarse</Button>
        </Form>
        
        <p>
          ¿Ya tienes una cuenta? 
          <Link to={"/login"}>
            <Button variant="light">Iniciar sesión</Button>
            </Link> 
          </p>
          <Alert message={error} success={success} confirm={message} />
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <img src="" alt="" style={{width:'15rem', backgroundColor: 'gray', height:'15rem'}}/>
      </div>
    </Container>
  )
}
