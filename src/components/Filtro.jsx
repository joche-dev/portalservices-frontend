import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Filtro() {
  const { getPublicaciones, filtros, setFiltros } = useContext(UserContext);
  const [regiones, setRegiones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');

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
    setFiltros({...filtros, ciudad: e.target.value});
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
    setFiltros({...filtros, comuna: e.target.value});
  };

  const handleInput = (e) => {
    e.preventDefault();
    setFiltros({...filtros, titulo: e.target.value});
  }

  const filtrarBusqueda = async () => {
    getPublicaciones();
    document.getElementById('titulo').value = '';
    setSelectedRegion('');
    setSelectedCommune('');
  }

  return (
    <Row className="mb-3">
      <Col xs={12} md={7} className="mb-3">
        <Form.Floating>
          <Form.Control id="titulo" type="text" placeholder="" onChange={(e) => {handleInput(e)}} />
          <label htmlFor="titulo">
            <i className="bi bi-search"></i> Busca por titulo
          </label>
        </Form.Floating>
      </Col>
      <Col xs={12} md={2} className="mb-3">
        <Form.Floating className="m-0">
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
            <i className="bi bi-geo-alt"></i> Busca por
          </label>
        </Form.Floating>
      </Col>
      <Col xs={12} md={2} className="mb-3">
        <Form.Floating>
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
            <i className="bi bi-geo-alt"></i> Busca por
          </label>
        </Form.Floating>
      </Col>
      <Col xs={12} md="auto" className="mb-3 mb-md-0">
        <Button variant="success w-100 p-3" onClick={() => filtrarBusqueda()}>Buscar</Button>
      </Col>
    </Row>
  );
}
