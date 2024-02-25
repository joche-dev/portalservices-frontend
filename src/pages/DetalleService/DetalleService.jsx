import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap';

export default function DetalleService() {

  const {id}= useParams();

  return (
    <div>
      <Card key={1} border="light" className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="dark">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </div>
  )
}

