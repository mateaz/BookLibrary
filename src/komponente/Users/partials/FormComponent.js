import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment'
import PropTypes from 'prop-types';

import * as Yup from 'yup';

export default function FormComponent (props) {
  const [initData, setData] = useState();
  const [startDate, setStartDate] = useState();

  const validationSchema = Yup.object().shape({
    id: Yup.number().typeError('Unos mora biti broj').positive('Broj mora  biti pozitivan').integer('Broj mora biti cijeli broj'),
    userName: Yup.string().required('Ime i prezime korisnika je obavezan unos'),
    dateOfBirth: Yup.date().required('Date of Birth is required')
  });

  useEffect(() => {
    if (props.user.dateOfBirth) {
      let dd = props.user.dateOfBirth.substring(8, 10);
      let mm =  props.user.dateOfBirth.substring(5, 7);
      let yyyy =  props.user.dateOfBirth.substring(0, 4);
      setStartDate(`${yyyy}-${mm}-${dd}`);
    } else {
      setStartDate('');
    };
    setData(props.user);
  }, [props.user]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    let dateBirth = data.dateOfBirth;
    let dateString = moment(dateBirth).format('YYYY-MM-DD');
    data.dateOfBirth = dateString;
    if (!initData.userName) {
      props.onUserDataSubmit(data, 'add');
    } else props.onUserDataSubmit(data, 'edit');
  };
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Id</Form.Label>
        <Form.Control type="text" disabled={!!props.user.id} placeholder="Id zapisa" {...register('id')} defaultValue={props.user.id}  className={`form-control ${errors.id ? 'is-invalid' : ''}`}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ime i prezime korisnika</Form.Label>
        <Form.Control type="text" placeholder="Ime i prezime korisnika" {...register('userName')} defaultValue={props.user.userName}  className={`form-control ${errors.userName ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.userName?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Datum rođenja</Form.Label>
        <Form.Control {...register('dateOfBirth')} type="date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.dateOfBirth?.message}</div>
      </Form.Group>
      <Button variant="primary" type="submit" className='button-custom'>
        U redu
      </Button>
    </Form>
  );
};

FormComponent.propTypes={
  onUserDataSubmit: PropTypes.func, 
  user: PropTypes.object
};