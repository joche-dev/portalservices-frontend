import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
  return (
    <Container className='d-flex justify-content-center gap-5 mt-5'>
      <div className = 'd-flex flex-column align-items-center m-5 gap-2'>
        <h1>Inicio de sesión.</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="example@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        <Button variant="dark">Iniciar sesion</Button>
        <p>¿No tiene una cuenta? </p>
      </div>
      <div style={{width:'30rem', backgroundColor: 'black'}}>
        <img src="" alt="" />
      </div>
      
    </Container>
    
  )
}