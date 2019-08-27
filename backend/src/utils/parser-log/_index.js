const fs = require('fs');
const { promisify } = require('util');

const { pathLog, encodingLog } = require('../../config/log');
const patterns = require('./patterns');

const deadByWorld = '<world>';
const games = [];

let file = null;
let countGames = 0;

const readFileAsync = promisify(fs.readFile)

const setGame = () => {
  countGames += 1;

  games[`game_${countGames}`] = {
    total_kills: 0,
    players: [],
    kills: {}
  }
};

const setPlayers = (line) => {
  const [id, player] = line
    .replace(patterns.player, '')
    .trim().split('n\\');

  const playerUpdated = games[`game_${countGames}`].players.findIndex(player => player.id === id.trim());

  if (playerUpdated > -1) {
    games[`game_${countGames}`].players[playerUpdated].player = player;
    return;
  }

  games[`game_${countGames}`].players.push({ id: id.trim(), player: player.trim() });
  games[`game_${countGames}`].kills[player] = 0;
};

const setKills = (line) => {
  const [killerPlayer,, killedPlayer] = line.replace(patterns.killers, '')
    .trim().split(' ');

  games[`game_${countGames}`].total_kills += 1;

  if (killerPlayer === deadByWorld) {
    games[`game_${countGames}`].kills[killedPlayer] -= 1;
    return;
  }

  games[`game_${countGames}`].kills[killerPlayer] += 1;
};

const getData = async () => {
  const file = await readFileAsync(pathLog, { encoding: encodingLog });

  lines = file.trim().split('\n');

  lines.forEach((line, i) => {
    if (line.match(patterns.initGame)) { setGame() }
    if (line.match(patterns.player)) { setPlayers(line) }
    if (line.match(patterns.killers)) { setKills(line) }
  });

  return games;
};

module.exports = {
  getData,
};
