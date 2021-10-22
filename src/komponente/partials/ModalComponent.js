import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComponent from './FormComponent';

export default function ModalComponent({show, handleClose, onClickFun}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
  );
};
