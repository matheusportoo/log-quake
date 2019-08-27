const { Router } = require('express');
const GamesController = require('./app/controllers/games');

const routes = new Router();

routes.get('/games', GamesController.index);
routes.get('/games/:id', GamesController.show);

module.exports = routes;
