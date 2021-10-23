import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function FormComponent ( {attributes, submitData }) {
  const [initData, setData] = useState();

  const validationSchema = Yup.object().shape({
    id: Yup.number().typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
    book_name: Yup.string().required('Naziv knjige je obavezan unos'),
    author_firstname: Yup.string().required('Ime autora je obavezan unos'),
    author_lastname: Yup.string().required('Prezime autora je obavezan unos')

  });

  useEffect(() => {
   setData(attributes);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    if (!initData.book_name) {
      submitData(data, 'add');
    } else submitData(data, 'edit')
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Id</Form.Label>
        <Form.Control type="text" disabled={!!attributes.id} placeholder="Id zapisa" {...register('id')} id="id-feature" defaultValue={attributes.id}  className={`form-control ${errors.id ? 'is-invalid' : ''}`}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Naziv knjige</Form.Label>
        <Form.Control type="text" placeholder="Naziv knjige" {...register('book_name')} id="book_name-feature" defaultValue={attributes.book_name}  className={`form-control ${errors.book_name ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.book_name?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ime autora</Form.Label>
        <Form.Control type="text" placeholder="Ime autora" {...register('author_firstname')} id="author_firstname-feature" defaultValue={attributes.author_firstname}  className={`form-control ${errors.author_firstname ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.author_firstname?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Prezime autora</Form.Label>
        <Form.Control type="text" placeholder="Prezime autora" {...register('author_lastname')} id="author_lastname-feature" defaultValue={attributes.author_lastname}  className={`form-control ${errors.author_lastname ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.author_lastname?.message}</div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

