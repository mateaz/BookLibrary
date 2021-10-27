import React from 'react';
import Button from './Button';
import {FiEdit} from 'react-icons/fi';
import PropTypes from 'prop-types';

export default function Container({data, openModalEdit}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id } = feature;
            const { date_of_birth } = feature;
            const { user_firstname } = feature;
            const { user_lastname } = feature;
            return (
                <div key={id} className="book-card">
                    <div className="user-icon"></div>
                    <div className="user-info">
                      <p className="name">{user_firstname} {user_lastname}</p>  
                      <p className="date-birth">{date_of_birth}</p>

                      <Button icon = {<FiEdit />} onClickFun = {openModalEdit} feature={feature}/>
                    </div>
                </div>
            )
        })}
    </div>
  );
};

Container.propTypes={
  openModalEdit: PropTypes.func, 
  data: PropTypes.array
};