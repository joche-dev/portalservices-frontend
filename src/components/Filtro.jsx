import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Filtro() {
  const [regiones, setRegiones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/data/chilean-locations.json');
        const data = await response.json();
        setRegiones(data.regiones);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  console.log(regiones);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);

    // Filtrar las comunas correspondientes a la región seleccionada
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
    setSelectedCommune(e.target.value);
  };

  return (
    <Row className="mb-3">
      <Col xs={12} md={7} className="mb-3">
        <Form.Floating>
          <Form.Control id="tituloEspecialidad" type="text" placeholder="" />
          <label htmlFor="tituloEspecialidad">
            <i className="bi bi-search"></i> Busca por titulo o especialidad
          </label>
        </Form.Floating>
      </Col>
      <Col xs={12} md={2} className="mb-3">
        <Form.Floating className="m-0">
          <Form.Select
            id="ciudad"
            value={selectedRegion}
            onChange={handleRegionChange}
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
            onChange={handleCommuneChange}
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
        <Button variant="success w-100 p-3">Buscar</Button>
      </Col>
    </Row>
  );
}
