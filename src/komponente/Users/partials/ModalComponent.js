import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComponent from './FormComponent';
import PropTypes from 'prop-types';

export default function ModalComponent({isShowing, onClickHide, attributes, submitData}) {
  return (
    //ova dva od modala su preimenovana za show i oHide
    <Modal show={isShowing} onHide={onClickHide}>
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
  isShowing: PropTypes.bool, 
  onClickHide: PropTypes.func,
  attributes: PropTypes.object,
  submitData: PropTypes.func,
};