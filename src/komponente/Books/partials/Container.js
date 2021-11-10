import React from 'react';
import {Button} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';

import PropTypes from 'prop-types';

export default function Container({data, onClickSetSelected, usersData}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id, userId, book_name, author_firstname, author_lastname } = feature;  
            return (
                <div key={id} className="book-card">
                  <div className="book-icon"></div>
                  <div className="book-info">
                    <p className="book-name">{book_name}</p>
                    <p className="book-author">{author_firstname} {author_lastname}</p> 
                    <Button onClick = {()=> onClickSetSelected(feature)}><FiEdit/></Button>

                    {/*{usersData&&usersData.map(data => {
                      if(data.id === userId) {
                        return <p key={data.id} className="info-about-user">Knjigu je trenutno posudio korisnik: <span>{data.user_firstname} {data.user_lastname}</span></p>
                      } else return false
                    })}*/}
                    </div>
                </div>
            )
        })}
    </div>
  );
};
Container.propTypes={
  data: PropTypes.array,
  openModalEdit: PropTypes.func,
  iconButton: PropTypes.object,
  usersData: PropTypes.array,
};