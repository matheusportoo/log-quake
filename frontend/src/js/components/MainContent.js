import React, { Component } from 'react';
import axios from 'axios';
import CardGame from './CardGame';

const api = 'http://localhost:4000/games';

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      games: []
    };
  }

  fetch = () => {
    this.setState({ isFetching: true })

    axios.get(api)
      .then(response => {
        this.setState({
          isFetching: false,
          games: response.data
        })
      })
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <main className="c-main-content l-app__main-content">
        <div className="c-main-content__wrapper">
          { this.state.games.map((game, i) => {
            const key = `game_${i + 1}`;
            const { kills, players, total_kills: totalKills } = game[key];
            const title = key.replace('_', ' ')

            return (
              <CardGame
                title={ title }
                kills={ kills }
                players={ players }
                totalKills={ totalKills }
              />
            )
          })}
        </div>
      </main>
    );
  }
}

export default MainContent;
