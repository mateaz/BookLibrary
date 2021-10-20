import React, {useEffect, useState} from 'react';
import {getAllBooks} from "./crud/http-methods-books";

import {BookList} from './komponente';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks().then(res => setBooks(res.data));
}, []);


  return (
    <div className="App">
        <BookList books={books}/>
    </div>
  );
}

export default App;
