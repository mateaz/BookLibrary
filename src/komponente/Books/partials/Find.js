import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function Find ( {onSubmit}) {
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Ime i prezime korisnika je obavezan unos'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="find-users-books">
      <Form.Group className="mb-3">
        <Form.Label>Pretraži korisnika</Form.Label>
        <Form.Control type="text" placeholder="Pretraži korisnika" {...register('user_name')} className={`form-control ${errors.user_name ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.user_name?.message}</div>
      </Form.Group>
      <Button variant="primary" type="submit" className="button-custom">Pretraži</Button>
    </Form>
  );
};

Find.propTypes={
  onSubmit: PropTypes.func,
};

