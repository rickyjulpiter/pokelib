import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

export default class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=12',
    pokemon: null,
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row mt-5 pt-5 mb-5">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard 
              key={pokemon.name}
              name ={pokemon.name}
              url = {pokemon.url}

              />
            ))}
          </div>
        ) : (
          <h2 className="m-2">Loading ...</h2>
        )}
      </React.Fragment>
    );
  }
}
