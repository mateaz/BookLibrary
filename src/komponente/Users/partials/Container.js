import React from 'react';
import {Button} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';
import PropTypes from 'prop-types';

export default function Container({data, onClickSetSelected}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id, date_of_birth, user_firstname, user_lastname} = feature;
            return (
                <div key={id} className="book-card">
                    <div className="user-icon"></div>
                    <div className="user-info">
                      <p className="name">{user_firstname} {user_lastname}</p>  
                      <p className="date-birth">{date_of_birth}</p>
                      <Button onClick = {()=> onClickSetSelected(feature)}><FiEdit/></Button>
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