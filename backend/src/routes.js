const { Router } = require('express');
const GamesController = require('./app/controllers/games');

const routes = new Router();

routes.get('/games', GamesController.index);

module.exports = routes;
