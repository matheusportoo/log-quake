import React from 'react';

const CardGame = ({ title, players, kills, totalKills }) => (
  <article className="c-card-game">
    <h2 className="o-title c-card-game__title">{ title }</h2>
    <p className="o-tag">Total kills: <strong>{ totalKills }</strong></p>
    <ul className="c-card-game__players">
      { players.map(player => (
        <li className="o-text c-card-game__player">
          { player } - <strong>{ kills[player] }</strong>
        </li>
      ) ) }
    </ul>
  </article>
);

export default CardGame;
