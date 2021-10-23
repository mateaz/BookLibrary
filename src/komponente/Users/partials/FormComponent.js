import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "react-datepicker/dist/react-datepicker.css";

import ReactDatePicker, { registerLocale } from "react-datepicker";
import hr from "date-fns/locale/hr"; // the locale you want


import * as Yup from 'yup';

export default function FormComponent ( {attributes, submitData }) {
  const [initData, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());


  const validationSchema = Yup.object().shape({
    id: Yup.number().typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
    date_of_birth: Yup.string().required('Naziv knjige je obavezan unos'),
    user_firstname: Yup.string().required('Ime korisnika je obavezan unos'),
    user_lastname: Yup.string().required('Prezime korisnika je obavezan unos')

  });

  useEffect(() => {
   setData(attributes);
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log(data)
    /*if (!initData.date_of_birth) {
      submitData(data, 'add');
    } else submitData(data, 'edit')*/
  };

  const handleChange = (e) => {
    setStartDate(e);
  };

  registerLocale("hr", hr); // register it with the name you want

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Id</Form.Label>
        <Form.Control type="text" disabled={!!attributes.id} placeholder="Id zapisa" {...register('id')} defaultValue={attributes.id}  className={`form-control ${errors.id ? 'is-invalid' : ''}`}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ime korisnika</Form.Label>
        <Form.Control type="text" placeholder="Ime korisnika" {...register('user_firstname')} defaultValue={attributes.user_firstname}  className={`form-control ${errors.user_firstname ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.user_firstname?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Prezime korisnika</Form.Label>
        <Form.Control type="text" placeholder="Prezime korisnika" {...register('user_lastname')} defaultValue={attributes.user_lastname}  className={`form-control ${errors.user_lastname ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.user_lastname?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Datum rođenja</Form.Label>
        <Form.Control type="text" placeholder="Datum rođenja" {...register('date_of_birth')} defaultValue={attributes.date_of_birth}  className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.date_of_birth?.message}</div>
      </Form.Group>
      <Controller
        control={control}
        name='date_of_birth'
        render={({ field }) => (
          <ReactDatePicker
            placeholderText='Odaberi datum rođenja'
            dateFormat="dd-MM-yyyy"
            selected={startDate}
            locale="hr"
            onChange={handleChange}
          />
      )}
      />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

