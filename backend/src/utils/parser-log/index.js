const { patterns, replaceLine } = require('./utils');

const DEAD_BY_WORLD = '<world>';
const PREFIX_KEY_GAME = 'game_';

class ParserLog {
  constructor(log) {
    this.log = log;
    this.lines = null;
    this.games = [];
    this.players = {};
    this.totalResults = {};
    this.countGames = 0;

    this.init();
  }

  static replaceLine(line, pattern) {
    return line.replace(pattern, '').trim();
  }

  init() {
    this.lines = this.log.trim().split('\n');

    this.lines.forEach((line) => {
      if (line.match(patterns.initGame)) { this.initGame(); }
      if (line.match(patterns.playerConnect)) { this.setPlayers(line); }
      if (line.match(patterns.playerInfoChanged)) { this.updatePlayerName(line); }

      if (line.match(patterns.killers)) {
        this.setTotalResults();
        this.updatePlayerKills(line);
      }
    });
  }

  getGames() {
    const totalGames = Object.keys(this.players).length;

    for (let index = 0; index < totalGames; index += 1) {
      const keyGame = `game_${index + 1}`;

      this.games.push({
        [keyGame]: {
          total_kills: this.totalResults[keyGame],
          players: this.players[keyGame].map(player => player.name),
          kills: this.players[keyGame].reduce((players, player) => {
            if (player.id) { players[player.name] = player.kills > 0 ? player.kills : 0; }
            return players
          }, {})
        }
      })
    }

    return this.games;
  }

  getKeyGame() {
    return `${PREFIX_KEY_GAME}${this.countGames}`;
  }

  initGame() {
    this.countGames += 1;

    const keyGame = this.getKeyGame();

    this.players[keyGame] = [];
    this.totalResults[keyGame] = 0;
  }

  setTotalResults() {
    const keyGame = this.getKeyGame();
    const hasTotalResults = this.totalResults[keyGame];

    if (!hasTotalResults) {
      this.totalResults[keyGame] = 1;
      return;
    }

    this.totalResults[keyGame] += 1;
  }

  setPlayers(line) {
    const keyGame = this.getKeyGame();
    const playerId = replaceLine(line, patterns.playerConnect);
    const playerIndex = this.players[keyGame]
      .findIndex(player => player.id === playerId);

    if (playerIndex === -1) {
      this.players[keyGame].push({ id: playerId, name: '', kills: 0 })
    }
  }

  updatePlayerName(line) {
    const keyGame = this.getKeyGame();
    const [id, name] = replaceLine(line, patterns.playerInfoChanged).split('n\\');
    const playerIndex = this.players[keyGame]
      .findIndex(player => player.id === id.trim());

    if (playerIndex > -1) {
      this.players[keyGame][playerIndex].name = name;
    }
  }

  updatePlayerKills(line) {
    const keyGame = this.getKeyGame();
    const [ids, names] = replaceLine(line, patterns.killers).split(': ');
    const [killerPlayerId, killedPlayerId, ] = ids.split(' ');
    const isDeadByWorld = names.includes(DEAD_BY_WORLD);
    const playerId = isDeadByWorld ? killedPlayerId : killerPlayerId;

    const playerIndex = this.players[keyGame]
      .findIndex(player => player.id === playerId);

    if (playerIndex > -1) {
      if (isDeadByWorld) {
        this.players[keyGame][playerIndex].kills -= 1;
        return;
      }
      this.players[keyGame][playerIndex].kills += 1;
    }
  }
}

module.exports = ParserLog;
