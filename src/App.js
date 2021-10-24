import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import {BookList, UserList, Interface} from './komponente';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/books">Knjige</Link>
          </li>
          <li>
            <Link to="/users">Korisnici</Link>
          </li>
          <li>
            <Link to="/posudi-vrati">Posudi/vrati knjigu</Link>
          </li>
        </ul>

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

