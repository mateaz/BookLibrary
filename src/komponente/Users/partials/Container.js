import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Container(props) {
  return (
    <div className="list-books">
        {props.users.map(user => {
            const { id, dateOfBirth, userName} = user;
            return (
                <div key={id} className="book-card">
                    <div className="user-icon"></div>
                    <div className="user-info">
                      <p className="name">{userName}</p>  
                      <p className="date-birth">{dateOfBirth}</p>
                      <Button className="button-custom" onClick = {()=> props.onSelectedClick(user)}>{props.iconElement}</Button>
                    </div>
                </div>
            )
        })}
    </div>
  );
};

Container.propTypes={
  onSelectedClick: PropTypes.func, 
  users: PropTypes.array,
  iconElement: PropTypes.node
};