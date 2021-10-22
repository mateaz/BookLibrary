import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function FormComponent ( {attributes, submitData }) {

  const validationSchema = Yup.object().shape({
    id: Yup.number().required('Id knjige je obavezan unos').typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
    name: Yup.string().required('Naziv knjige je obavezan unos'),
    author: Yup.string().required('Ime i prezime autora je obavezan unos')
  });

  const handleChange = (event) => {
   /* console.log(event.target)
   /* console.log(event.target.id)*/
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
 //   console.log(JSON.stringify(data, null, 2));
    submitData(data)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" placeholder="Id zapisa" {...register('id')} id="id-feature" defaultValue={attributes.id} onChange={handleChange} className={`form-control ${errors.id ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.id?.message}</div>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Naziv knjige</Form.Label>
            <Form.Control type="text" placeholder="Naziv knjige" {...register('name')} id="name-feature" defaultValue={attributes.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.name?.message}</div>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Ime i prezime autora</Form.Label>
            <Form.Control type="text" placeholder="Ime i prezime autora" {...register('author')} id="author-feature" defaultValue={attributes.author} onChange={handleChange} className={`form-control ${errors.author ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.name?.author}</div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
    </Form>
  );
};

