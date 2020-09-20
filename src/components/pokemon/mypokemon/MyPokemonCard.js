import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link) `
text-decoration : none;
&:focus, &:hover, &:visited, &:link, &active {
    text-decoration: none
}
`

export default class MyPokemonCard extends Component {
    state = {
        name : '',
        imageUrl : '',
        pokemonIndex : ''
    }

    componentDidMount () {
        const {name, url} = this.props;
        const pokemonIndex = url.split("/")[url.split('/').length - 2];
        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`

        this.setState({
            name: name, 
            imageUrl: imageUrl, 
            pokemonIndex: pokemonIndex
        })
    }

    render() {
        return (
            <>
            <div className="col-md-3 col-sm-6 col-lg-3 col-xs-4 p-1">
                <StyledLink to={`mypokemon/${this.state.pokemonIndex}`}>
                    <div className="card" style={{borderRadius: 15}}>
                        <div className="card-body mx-auto" >
                            <img src={this.state.imageUrl} className="card-img-top" style={{borderRadius: 50}} alt={this.state.name}></img>
                            
                            <h5 className="card-header mt-2 text-center" style={{borderRadius:50, textDecoration: 'none'}}>
                                {
                                    this.state.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map(
                                            letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                        )
                                        .join(' ')
                                }                            
                            </h5>
                        </div>
                    </div>
                </StyledLink>
            </div>

            </>
        )
    }
}
