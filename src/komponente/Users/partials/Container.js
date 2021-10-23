import React from 'react';
import Button from './Button';
import {FiEdit} from 'react-icons/fi';

export default function Container({data, openModalEdit}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id } = feature;
           // const { userId } = feature;
            const { date_of_birth } = feature;
            const { user_firstname } = feature;
            const { user_lastname } = feature;

          //  const {image } = feature
            return (
                <div key={id} className="book-card">
                    {/*  <img src={require(`../img/${image}`).default} width={150} height={150}/>*/}
                    <p className="author_firstname-book">{user_firstname} {user_lastname}</p>  
                    {/*  <p>{userId}</p>      */}
                    <p className="book_name-book">{date_of_birth}</p>

                    <Button styleName={'book-list-button'} icon = {<FiEdit />} onClickFun = {openModalEdit} feature={feature}/>
                </div>
            )
        })}
    </div>
  );
};
