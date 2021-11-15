import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export default function ModalComponent(props) {
  return (
    <Modal show={props.isShowing} onHide={props.onHideModalClick}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal>
  );
};

ModalComponent.propTypes={
  modalTitle: PropTypes.string,
  isShowing: PropTypes.bool, 
  onHideModalClick: PropTypes.func,
  children: PropTypes.object,
};