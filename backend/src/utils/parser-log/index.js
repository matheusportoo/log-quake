const patterns = require('./patterns');

const DEAD_BY_WORLD = '<world>';

class ParserLog {
  constructor(log) {
    this.log = log;
    this.lines = null;
    this.games = [];
    this.countGames = 0;
  }

  init() {
    this.lines = this.log.trim().split('\n');

    this.lines.forEach((line, index) => {
      if (line.match(patterns.initGame)) { this.setGame(); }
      if (line.match(patterns.player)) { this.setPlayers(line); }
      if (line.match(patterns.killers)) { this.setKills(line, index); }
    });

    return this;
  }

  getData() {
    return this.games;
  }

  setGame() {
    this.countGames += 1;

    this.games.push({
      [`game_${this.countGames}`]: {
        total_kills: 0,
        players: [],
        kills: {}
      }
    });
  }

  setPlayers(line) {
    const [id, name] = line.replace(patterns.player, '').trim().split('n\\');
    const countGames = this.countGames;
    const position = this.countGames - 1;

    const playerUpdated = this.games[position][`game_${countGames}`].players
      .findIndex(player => player.id === id.trim());

    if (playerUpdated > -1) {
      this.games[position][`game_${countGames}`].players[playerUpdated].name = name;
      return;
    }

    this.games[position][`game_${countGames}`].players.push({ id: id.trim(), name: name.trim() });
    this.games[position][`game_${countGames}`].kills[name] = 0;
  }

  setKills(line, index) {
    const [killerPlayer, killedPlayer] = line
      .replace(patterns.killers, '')
      .trim()
      .split('killed')
      .map(name => name.trim());

    const countGames = this.countGames;
    const position = this.countGames - 1;
    const hasPlayer = this.games[position][`game_${countGames}`].players
      .find(player => player.name === killerPlayer)

    this.games[position][`game_${countGames}`].total_kills += 1;

    console.log({
      killedPlayer,
      killerPlayer,
      line: line.replace(patterns.killers, '').trim().split('killed')
    })

    if (killerPlayer === DEAD_BY_WORLD) {
      console.log('line killed by world', {
        index,
        line,
        killerPlayer,
        killedPlayer,
      });
      console.log('\n')
      this.games[position][`game_${countGames}`].kills[killedPlayer] -= 1;
      return;
    }

    if (hasPlayer) {
      console.log('line killed by player', {
        index,
        line,
        killerPlayer,
        killedPlayer,
      });
      console.log('\n')
      this.games[position][`game_${countGames}`].kills[killerPlayer] += 1;
    }
  }
}

module.exports = ParserLog;
