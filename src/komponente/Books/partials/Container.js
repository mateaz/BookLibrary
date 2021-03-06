import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Container(props) {
  return (
    <div className="list-books">
        {props.books.map(book => {
            const { id, bookName, authorName } = book;  
            return (
                <div key={id} className="book-card" >
                  <div className="book-icon"></div>
                  <div className="book-info">
                    <p className="book-name">{bookName}</p>
                    <p className="book-author">{authorName}</p> 
                    <Button className="button-custom" onClick = {()=> props.onSelectedClick(book, props.numUserId)}>{props.iconElement}</Button>
                    </div>
                </div>
            )
        })}
    </div>
  );
};

Container.propTypes={
  books: PropTypes.array,
  onSelectedClick: PropTypes.func,
  numUserId: PropTypes.number,
  iconElement: PropTypes.node
};