import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function FormComponent ( {attributes, submitData }) {
  const validationSchema =  Yup.object().shape({
    id: Yup.number()
      .required('Id knjige je obavezan unos')
      .typeError('Unos mora biti broj')
      .positive('Broj mora  biti pozitivan')
      .integer('Broj mora biti cijeli broj'),

    name: Yup.string().required('Naziv knjige je obavezan unos'),
    author: Yup.string().required('Ime i prezime autora je obavezan unos'),
  });

  /*if(idData) {
    validationSchema.person = Yup.object().shape({
      name: Yup.string().required('Field is required'),
      })
    }*/

  const handleChange = (event) => {
   /* console.log(event.target)
   /* console.log(event.target.id)*/
  }

  const {register, handleSubmit, setError, formState: { errors }} = useForm();


  const onSubmit = data => {
    console.log(data)
    submitData(data)
  };

  const onError = (errors, e) => console.log(errors, e);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-3" >
            <Form.Label>Id</Form.Label>
            <Form.Control 
              type="string"
              id="id"
              name="id"
              placeholder="Id zapisa"
              {...register('id', { required: true})}
              autoFocus
              defaultValue={attributes.id} 
              disabled={!!attributes.id} 
            />
           {errors.id && errors.id.message}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Naziv knjige</Form.Label>
            <Form.Control 
              type="text"  
              name="name"
              id="name"
              placeholder="Naziv knjige" 
              {...register('name', { required: true})}
              defaultValue={attributes.name} 
              
              />
           {errors.name && <p>{errors.name.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Ime i prezime autora</Form.Label>
            <Form.Control 
              type="text" 
              name="author" 
              id="author"
              placeholder="Ime i prezime autora" 
              {...register('author', { required: "Required"})}
              defaultValue={attributes.author} 
             />
           {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

