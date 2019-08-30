import React from 'react';
import PropTypes from 'prop-types';

const CardGame = ({ title, players, kills, totalKills }) => (
  <article className="c-card-game">
    <h2 className="o-title c-card-game__title">{ title }</h2>
    <p className="o-tag">Total kills: <strong>{ totalKills }</strong></p>
    <ul className="c-card-game__players">
      { players.map((player, index) => (
        <li className="o-text c-card-game__player" key={ `card-game-player_${index}` }>
          { player } - <strong>{ kills[player] }</strong>
        </li>
      ) ) }
    </ul>
  </article>
);

CardGame.propTypes = {
  title: PropTypes.string,
  players: PropTypes.array,
  kills: PropTypes.object,
  totalKills: PropTypes.number
};

export default CardGame;
