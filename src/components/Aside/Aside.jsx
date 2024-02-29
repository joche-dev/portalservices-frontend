import './Aside.css';
import React from 'react'
import { Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function Aside() {
    const navigate = useNavigate();

  return (
    <Row className='contenedor'>
        <Row className='mb-3 mb-md-0 ms-1'>
                <span className="d-flex gap-2 fw-semibold fs-4">
                    <i className="bi bi-person-circle"></i> 
                    Perfil
                </span>
        </Row>
        <Col className='d-flex flex-column border-top pt-1 gap-3'>
            <Row  className='mb-3 mb-md-0 ms-1' onClick={() => navigate(`/user/services`)}>
                    <span className="d-flex gap-2 click" >
                        <i className="bi bi-images"></i> 
                        Mis publicaciones
                    </span>
            </Row>
            <Row className='mb-3 mb-md-0 ms-1' onClick={() => navigate(`/user/favorites`)}>
                    <span className="d-flex gap-2 click">
                        <i className="bi bi-heart"></i> 
                        Mis favoritos
                    </span>
                
            </Row>
            <Row className='mb-3 mb-md-0 ms-1'>
                <span className="d-flex gap-2 click">
                        <i className="bi bi-plus-circle"></i> 
                        Nueva publicación
                </span>       
            </Row>
        </Col>
    </Row>
)
}
