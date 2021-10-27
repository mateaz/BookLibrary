import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

export default function Container({data, openModalEdit, iconButton, usersData}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id } = feature;
            const { userId } = feature;
            const { book_name } = feature;
            const { author_firstname } = feature;
            const { author_lastname } = feature;         
            return (
                <div key={id} className="book-card">
                  <div className="book-icon"></div>
                  <div className="book-info">
                    <p className="book-name">{book_name}</p>
                    <p className="book-author">{author_firstname} {author_lastname}</p> 
                    <Button icon = {iconButton} onClickFun = {openModalEdit} feature={feature}/>
                    {usersData && usersData.map(data => {
                      if(data.id === userId) {
                        return <p key={data.id} className="info-about-user">Knjigu je trenutno posudio korisnik: <span>{data.user_firstname} {data.user_lastname}</span></p>
                      } else return false
                    })}
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