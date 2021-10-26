import React from 'react';
import Button from './Button';
import {FiEdit} from 'react-icons/fi';

export default function Container({data, openModalEdit, onClickFun, attributes, usersData}) {
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
                    <p className="book_name-book">{book_name}</p>
                    <p className="author_firstname-book">{author_firstname} {author_lastname}</p> 
                    {usersData && usersData.map(data => {
                      if(data.id === userId) {
                        return <p key={data.id}>Knjigu je trenutno posudio korisnik: {data.user_lastname}</p>
                      }
                    })}
                    <Button styleName={'book-list-button'} icon = {<FiEdit />} onClickFun = {openModalEdit} feature={feature}/>
                </div>
            )
        })}
    </div>
  );
};
