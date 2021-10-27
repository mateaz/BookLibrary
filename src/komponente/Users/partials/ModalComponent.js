import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComponent from './FormComponent';
import PropTypes from 'prop-types';

export default function ModalComponent({show, handleClose, attributes, submitData}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Izmijeni/dodaj podatke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent 
            attributes = {attributes}
            submitData = {submitData}
          />
        </Modal.Body>
      </Modal>
  );
};


ModalComponent.propTypes={
  show: PropTypes.bool, 
  handleClose: PropTypes.func,
  attributes: PropTypes.object,
  submitData: PropTypes.func,
};