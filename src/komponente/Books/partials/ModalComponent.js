import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export default function ModalComponent({isShowing, onClickHide, child}) {
  return (
    <Modal show={isShowing} onHide={onClickHide}>
        <Modal.Header closeButton>
          <Modal.Title>Izmijeni/dodaj podatke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.child}
        </Modal.Body>
      </Modal>
  );
};

ModalComponent.propTypes={
  isShowing: PropTypes.bool, 
  onClickHide: PropTypes.func,
  child: PropTypes.object,
};