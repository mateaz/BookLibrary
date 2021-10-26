import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent({show, handleClose, child}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {child}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  );
};
