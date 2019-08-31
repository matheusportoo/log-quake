import React, { Component } from 'react';
import axios from 'axios';
import CardGame from './CardGame';
import Button from './Button';

const API = 'http://localhost:4000/games';

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      games: [],
      errorMessage: ''
    };
  }

  submit = (event) => {
    event.preventDefault();
    const gameId = this.refs.term.value.replace(/[^\d]/g, '');

    gameId && this.fetch(gameId);
  }

  fetch = (gameId) => {
    this.setState({ isFetching: true, errorMessage: '' });

    const hasGameId = typeof gameId === 'string';
    const api = hasGameId ? `${API}/${gameId}` : API;

    axios.get(api)
      .then(response => {
        const games = hasGameId ? [response.data] : response.data;
        this.setState({ isFetching: false, games });
      }).catch((error) => {
        const errorMessage = `${error.response.data.error}`;
        this.setState({ errorMessage, games: [] });
      })
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <main className="c-main-content l-app__main-content">
        <div className="c-main-content__wrapper">
        <div className="c-main-content__search">
          <form className="c-main-content__form">
            <label className="o-text c-main-content__form-label">Fetch by number game:</label>
            <input className="c-main-content__form-input" placeholder="'game 1'" ref="term"></input>
            <Button type="submit" text="search" customClasses="-default c-main-content__form-button" onClick={ this.submit } />
            <Button type="reset" text="reset" customClasses="-outline c-main-content__form-button" onClick={ this.fetch } />
          </form>
        </div>
          <div className="c-main-content__list">
            { this.state.errorMessage &&
              <span className="o-text c-main-content__error">» {this.state.errorMessage} :(</span>
            }

            { !!this.state.games.length && this.state.games.map((game, i) => {

              const key = Object.keys(game)[0];
              const { kills, players, total_kills: totalKills } = game[key];
              const title = key.replace('_', ' ')

              return (
                <CardGame
                  title={ title }
                  kills={ kills }
                  players={ players }
                  totalKills={ totalKills }
                  customClasses="c-main-content__list-item"
                  key={ `card-${key}` }
                />
              )
            })}
          </div>
        </div>
      </main>
    );
  }
}

export default MainContent;
