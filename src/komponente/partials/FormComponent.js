import React from 'react';
import Form from 'react-bootstrap/Form';

export default function FormComponent({show, handleClose, onClickFun}) {
  return (
    <Form>
        <Form.Group className="mb-3">
            <Form.Label>Naziv knjige</Form.Label>
            <Form.Control type="text" placeholder="Naziv knjige" value="d"/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Ime i prezime autora</Form.Label>
            <Form.Control type="text" placeholder="Ime i prezime autora" />
        </Form.Group>
    </Form>
  );
};

