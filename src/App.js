import React, {useEffect, useState} from 'react';
import {getAllBooks} from "./crud/http-methods-books";

import {BookList} from './komponente';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
 // const [books, setBooks] = useState([]);

  /*useEffect(() => {
    getAllBooks().then(res => setBooks(res.data));
}, []);*/


  return (
    <div className="App">
        <BookList/>
    </div>
  );
}

