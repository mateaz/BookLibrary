import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function FormComponent ( {attributes, submitData }) {
  const [initData, setData] = useState();

  const validationSchema = Yup.object().shape({
    id: Yup.number().typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
    bookName: Yup.string().required('Naziv knjige je obavezan unos'),
    authorName: Yup.string().required('Ime i preziem autora je obavezan unos'),
  });

  useEffect(() => {
   setData(attributes);
  }, [attributes]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    data.userId = initData.userId;
    if (!initData.bookName) {
      submitData(data, 'add');
    } else submitData(data, 'edit')
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Id knjige</Form.Label>
        <Form.Control type="text" disabled={!!attributes.id} placeholder="Id zapisa" {...register('id')} id="id-feature" defaultValue={attributes.id}  className={`form-control ${errors.id ? 'is-invalid' : ''}`}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Naziv knjige</Form.Label>
        <Form.Control type="text" placeholder="Naziv knjige" {...register('bookName')} id="bookName-feature" defaultValue={attributes.bookName}  className={`form-control ${errors.bookName ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.bookName?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ime autora</Form.Label>
        <Form.Control type="text" placeholder="Ime autora" {...register('authorName')} id="authorName-feature" defaultValue={attributes.authorName}  className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.authorName?.message}</div>
      </Form.Group>
      <Button type="submit" className='button-custom'>
        U redu
      </Button>
    </Form>
  );
};

FormComponent.propTypes={
  attributes: PropTypes.object, 
  submitData: PropTypes.func,
};