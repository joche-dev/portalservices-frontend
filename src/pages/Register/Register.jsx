import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Register() {
  return (
    <Container className='d-flex justify-content-center gap-5 mt-5'>
      <div className = 'd-flex flex-column align-items-center m-5 gap-2'>
        <h1>Registrarse.</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Control type="text" placeholder="Nombre completo" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="example@example.com" />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupCity">
            <Form.Control type="text" placeholder="Ciudad" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupComuna">
            <Form.Control type="text" placeholder="Comuna" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword1">
            <Form.Control type="password" placeholder="Confirmar Password" />
          </Form.Group>
        </Form>
        <Button variant="dark">registrarse</Button>
        <p>¿Ya tienes una cuenta? </p>
      </div>
      <div style={{width:'30rem', backgroundColor: 'red'}}>
        <img src="" alt="" />
      </div>
      
    </Container>
  )
}
