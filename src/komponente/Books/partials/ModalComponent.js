import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export default function ModalComponent({show, handleClose, child}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Izmijeni/dodaj podatke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {child}
        </Modal.Body>
      </Modal>
  );
};

ModalComponent.propTypes={
  show: PropTypes.bool, 
  handleClose: PropTypes.func,
  child: PropTypes.object,
};