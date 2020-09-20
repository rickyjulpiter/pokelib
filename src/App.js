import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon'
import MyPokemonList from './components/pokemon/mypokemon/MyPokeList'
import MyPokemon from './components/pokemon/mypokemon/MyPokemon'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mb-5">
            <Link className="navbar-brand" to="/">
              Pokemon Library
            </Link>
            <div className="navbar-nav">
              <Link className="nav-item nav-link navbar-right" to="/mypokemonlist">
                My Pokemon
              </Link>
            </div>
          </nav>

          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/pokemon/:pokemonIndex"  component={Pokemon}></Route>
          <Route path="/mypokemonlist" component={MyPokemonList}></Route>
          <Route path="/mypokemon/:pokemonIndex" component={MyPokemon}></Route>
        </div>
      </Router>
    );
  }
}

export default App;