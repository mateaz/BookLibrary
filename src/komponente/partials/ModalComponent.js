import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComponent from './FormComponent';

export default function ModalComponent({show, handleClose, onClickFun, attributes, submitData}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent 
            attributes = {attributes}
            submitData = {submitData}
          />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
  );
};
