import React, { Component } from 'react';
import Axios from 'axios';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

export default class MyPokeLibCard extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        statTitleWidth: 3,
        statBarWidth: 9,
        stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
        themeColor: '#EF5350',
        linkAPI: ''
    };

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;

        // Urls for pokemon information
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        // Get Pokemon Information
        const pokemonRes = await Axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`;

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                break;
            }
        });

        // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)

        const linkAPI =  pokemonUrl

        const height =
        Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

        const weight =
        Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

        const types = pokemonRes.data.types.map(type => type.type.name);

        const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

        const abilities = pokemonRes.data.abilities
        .map(ability => {
            return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

        const evs = pokemonRes.data.stats
        .filter(stat => {
            if (stat.effort > 0) {
                return true;
            }
            return false;
        })
        .map(stat => {
            return `${stat.effort} ${stat.stat.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}`;
            })
            .join(', ');

        // Get Pokemon Description .... Is from a different end point uggh
        await Axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                    }
                });
                const femaleRate = res.data['gender_rate'];
                const genderRatioFemale = 12.5 * femaleRate;
                const genderRatioMale = 12.5 * (8 - femaleRate);
                const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

                const eggGroups = res.data['egg_groups']
                    .map(group => {
                    return group.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                    })
                    .join(', ');

                const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

        this.setState({
            description,
            genderRatioFemale,
            genderRatioMale,
            catchRate,
            eggGroups,
            hatchSteps
        });
        });

        this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        stats: {
            hp,
            attack,
            defense,
            speed,
            specialAttack,
            specialDefense
        },
        themeColor,
        height,
        weight,
        abilities,
        evs,
        linkAPI
        });
    }

    catchButtonHandler = (pokemonIndex, name, url) => {
        var apiEndpoint = `https://pokelibapi.sistempintar.com/`
        var alertShow = ''
        //kemungkinan tertangkap adalah 50% jadi antara 1 atau 2
        //2 diasumsikan tertangkap dan 1 diasumsikan tidak tertangkap
        let catchRateProbability = Math.floor(Math.random() * 2) + 1
        if(catchRateProbability === 2) {
            // Axios
            //     .post(apiEndpoint,null, {
            //         params: {
            //             id : pokemonIndex,
            //             name : name,
            //             url : url
            //         }
            //     })
            //     .then(response => {
            //         let catchPotentialResults = response.data.catchPotentialResults
            //         let catchPotentialMessage = ''
            //         if(catchPotentialResults = 1) {
            //             catchPotentialMessage = `Successfully caught Pokemon ${name} (Success Probability : ${catchPotentialResults})`
            //         }
            //         console.log(response.data.message)
            //         this.setState({
            //             catchPotentialMessage
            //         })
    
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })
            let alertShow = "alert alert-warning alert-dismissible fade show"
            console.log(alertShow)
        } else {
            let alertShow = "alert alert-warning alert-dismissible fade"
            console.log(alertShow)
        }
        this.setState({
            alertShow
        })

    }
   
    render() {
        return (
            <div className="col mb-5" style={{marginTop: `5rem`}}>
                <div className={this.state.alertShow} role="alert">
                    {this.state.catchPotential}
                </div>
                <div className="card mt-2">
                    <div className="card-header bg-secondary">
                        <div className="row">
                            <div className="col-5">
                                <h5 className="text-white">{this.state.pokemonIndex}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                {this.state.types.map(type => (
                                    <span
                                    key={type}
                                    className="badge badge-pill mr-1"
                                    style={{
                                        backgroundColor: `#${TYPE_COLORS[type]}`,
                                        color: 'white'
                                    }}
                                    >
                                    {type
                                        .toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')}
                                    </span>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className=" col-md-3 ">
                                <img
                                src={this.state.imageUrl}
                                className="card-img-top rounded mx-auto mt-2"
                                alt = {this.state.name}
                                />
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto">
                                {this.state.name
                                    .toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                                </h4>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        HP
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.hp}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Attack
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.attack}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Defense
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.defense}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Speed
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.speed}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Special Attack
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.specialAttack}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow={this.state.stats.specialAttack}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.specialAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Special Defense
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.specialDefense}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow={this.state.stats.specialDefense}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.specialDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <p className="">{this.state.description}</p>
                        </div>
                    </div>
                    </div>
                    <hr />
                    <div className="card-body">
                            <h5 className="card-title text-center">Profile</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="float-right">Height:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.height} ft.</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Weight:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.weight} lbs</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Catch Rate:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.catchRate}%</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Gender Ratio:</h6>
                                        </div>
                                        <div className="col-6">
                                            <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.genderRatioFemale}%`,
                                                backgroundColor: '#c2185b'
                                                }}
                                                aria-valuenow="15"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.genderRatioFemale}</small>
                                            </div>
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.genderRatioMale}%`,
                                                backgroundColor: '#1976d2'
                                                }}
                                                aria-valuenow="30"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.genderRatioMale}</small>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="float-right">Egg Groups:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.eggGroups} </h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Hatch Steps:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.hatchSteps}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Abilities:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.abilities}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">EVs:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.evs}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <button 
                                className="btn btn-outline-danger btn-block float-right" 
                                style={{borderRadius: 50}}
                                onClick={() => this.catchButtonHandler(this.state.pokemonIndex, this.state.name, this.state.linkAPI)}
                            >
                                    Release
                            </button>
                        </div>
                    </div>
            </div>
        );
    }
}