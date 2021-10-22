import React from 'react';
import Button from './Button';
import {FiEdit} from 'react-icons/fi';

export default function Container({data, openModalEdit, onClickFun, attributes, submitData}) {
  return (
    <div className="list-books">
        {data.map(feature => {
            const { id } = feature;
           // const { userId } = feature;
            const { name } = feature;
            const { author } = feature;
          //  const {image } = feature
            return (
                <div key={id} className="book-card">
                    {/*  <img src={require(`../img/${image}`).default} width={150} height={150}/>*/}
                    <p className="name-book">{name}</p>
                    <p className="author-book">{author}</p>  
                    {/*  <p>{userId}</p>      */}
                    <Button styleName={'book-list-button'} icon = {<FiEdit />} onClickFun = {openModalEdit} feature={feature}/>
                </div>
            )
        })}
    </div>
  );
};
