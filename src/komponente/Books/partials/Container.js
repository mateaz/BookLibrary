import React from 'react';
import {Button} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';

import PropTypes from 'prop-types';

export default function Container({data, onClickSetSelected, usersData}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id, bookName, authorName } = feature;  
            return (
                <div key={id} className="book-card" >
                  <div className="book-icon"></div>
                  <div className="book-info">
                    <p className="book-name">{bookName}</p>
                    <p className="book-author">{authorName}</p> 
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
  iconButton: PropTypes.object,
  usersData: PropTypes.array,
};