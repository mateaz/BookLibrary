import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/splide/dist/css/splide.min.css';

import {BookList, UserList, Interface} from './komponente';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [clickedLink, setClickedLink] = useState('');
  return (
    <Router>
      <div className="book-library-app">
        <ul className="nav-header">
          <li>
            <Link onClick={()=> setClickedLink('books')} className={clickedLink === 'books'? 'clickedLink' : null} to="/books">Knjige</Link>
          </li>
          <li>
            <Link onClick={()=> setClickedLink('users')} className={clickedLink === 'users'? 'clickedLink' : null} to="/users">Korisnici</Link>
          </li>
          <li>
            <Link onClick={()=> setClickedLink('posudi-vrati')} className={clickedLink === 'posudi-vrati'? 'clickedLink' : null}  to="/posudi-vrati">Posudi/vrati knjigu</Link>
          </li>
        </ul>
        <div>
        <Splide options={{rewind: true, gap: '1rem'}}>
          <SplideSlide>
            <div id="splideOne" className="splide-background">
              <h3>Pretraži i pregledaj knjige</h3>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div id="splideTwo" className="splide-background">
              <h3>Pretraži i pregledaj korisnike</h3>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div id="splideThree" className="splide-background">
              <h3>Posudi i vrati knjigu</h3>
            </div>
          </SplideSlide>
        </Splide>
        </div>
        <Switch>
          <Route path="/books">
            <BookList />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/posudi-vrati">
            <Interface />
          </Route>
          <Route path="/">
            <BookList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

