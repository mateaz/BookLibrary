import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

import DatePicker , { registerLocale } from "react-datepicker";
import hr from "date-fns/locale/hr"; // the locale you want


import * as Yup from 'yup';

export default function FormComponent ( {attributes, submitData }) {
  const [initData, setData] = useState();
  const [startDate, setStartDate] = useState();
  const [date, setDate] = useState(new Date());

  const validationSchema = Yup.object().shape({
    id: Yup.number().typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
    user_firstname: Yup.string().required('Ime korisnika je obavezan unos'),
    user_lastname: Yup.string().required('Prezime korisnika je obavezan unos'),
    date_of_birth: Yup.date().required('Date of Birth is required')//.matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format dd-MM-DD'),

  });

  useEffect(() => {
    /*if (attributes.date_of_birth) {
      let dd = attributes.date_of_birth.substring(0, 2);
      let mm =  attributes.date_of_birth.substring(3, 5);
      let yyyy =  attributes.date_of_birth.substring(6, 10);
      console.log(`${yyyy}-${mm}-${dd}`)
      setStartDate(`${yyyy}-${mm}-${dd}`);     POGLEDATI STA JE S OI*VIM ERROROM
    } else {*/
      setStartDate('');
   // };
   
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
    let dateBirth = data.date_of_birth;
    let dateString = moment(dateBirth).format('DD/MM/YYYY');
    data.date_of_birth = dateString;

    if (!initData.user_firstname) {
      submitData(data, 'add');
    } else submitData(data, 'edit');
  };

 // const handleChange = (e) => {
    /*console.log(e)
    console.log(startDate)*/
        /*let dd = attributes.date_of_birth.substring(0, 2);
    let mm =  attributes.date_of_birth.substring(3, 5);
    let yyyy =  attributes.date_of_birth.substring(6, 10);

    let date = `${mm}/${dd}/${yyyy}`;*/
    //setStartDate(new Date(date))
   // setStartDate(e);
  //};

  //registerLocale("hr", hr); // register it with the name you want

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
        <Form.Control {...register('date_of_birth')} type="date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.date_of_birth?.message}</div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

