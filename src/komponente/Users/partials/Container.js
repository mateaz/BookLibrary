import React from 'react';
import {Button} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';
import PropTypes from 'prop-types';

export default function Container({userList, onClickSetSelected}) {
  return (
    <div className="list-books">
        {userList.map(user => {
            const { id, date_of_birth, user_name} = user;
            return (
                <div key={id} className="book-card">
                    <div className="user-icon"></div>
                    <div className="user-info">
                      <p className="name">{user_name}</p>  
                      <p className="date-birth">{date_of_birth}</p>
                      <Button onClick = {()=> onClickSetSelected(user)}><FiEdit/></Button>
                    </div>
                </div>
            )
        })}
    </div>
  );
};

Container.propTypes={
  onClickSetSelected: PropTypes.func, 
  userList: PropTypes.array
};