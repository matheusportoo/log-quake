const fs = require('fs');
const { promisify } = require('util');

const ParserLog = require('../../utils/parser-log/index');
const { pathLog, encodingLog } = require('../../config/log');

const readFileAsync = promisify(fs.readFile)

module.exports = {
  async index(request, response) {
    const log = await readFileAsync(pathLog, { encoding: encodingLog });
    const parser = new ParserLog(log);
    const games = parser.getGames();

    return response.json(games);
  },

  async show(request, response) {
    const { id } = request.params;
    const log = await readFileAsync(pathLog, { encoding: encodingLog });
    const parser = new ParserLog(log);
    const games = parser.getGames();

    const game = games.find(item => Object.keys(item)[0] === `game_${id}`);

    if (!game) {
      return response.status(400).json({ error: `Game ${id} not found! There are only ${games.length}` });
    }

    return response.json(game);
  }
};
