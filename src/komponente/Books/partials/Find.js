import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Find ( {onSubmit}) {
  const validationSchema = Yup.object().shape({
    id: Yup.number().required('Potrebno je upisati ID korisnika').typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Pretraži korisnika prema ID-u</Form.Label>
        <Form.Control type="text" placeholder="Id zapisa" {...register('id')} className={`form-control ${errors.id ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.id?.message}</div>
      </Form.Group>
      <Button variant="primary" type="submit">Pretraži</Button>
    </Form>
  );
};

