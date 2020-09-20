import React, { Component } from "react";
import PokemonCard from "./MyPokemonCard";
import axios from "axios";

export default class MyPokeList extends Component {
  state = {
    url: 'https://pokelibapi.sistempintar.com',
    pokemon: null,
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] });
    console.log(res.data)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row mt-5 pt-5 mb-5">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard 
              key={pokemon.name}
              name ={pokemon.nickname}
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
