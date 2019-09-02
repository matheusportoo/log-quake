const fs = require('fs');
const { promisify } = require('util');
const Joi = require('@hapi/joi');

const ParserLog = require('../../utils/parser-log/index');
const { pathLog, encodingLog } = require('../../config/log');

const readFileAsync = promisify(fs.readFile)
let games = [];

module.exports = {
  async all(request, response) {
    if (!games.length) {
      const log = await readFileAsync(pathLog, { encoding: encodingLog });
      const parser = new ParserLog(log);

      games = parser.getGames();
    }

    return response.json(games);
  },

  async show(request, response) {
    const schema = {
      id: Joi.number().integer().min(1)
    };

    const { error } = Joi.validate(request.params, schema);

    if (error) {
      return response.status(400).json({error: error.details[0].message});
    }

    const { id } = request.params;

    if (!games.length) {
      const log = await readFileAsync(pathLog, { encoding: encodingLog });
      const parser = new ParserLog(log);

      games = parser.getGames();
    }

    const game = games.find(item => Object.keys(item)[0] === `game_${id}`);

    if (!game) {
      return response.status(400).json({
        error: `Game ${id} not found! There are only ${games.length}`
      });
    }

    return response.json(game);
  }
};
