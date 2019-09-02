const { Router } = require('express');
const GamesController = require('./app/controllers/games');

const routes = new Router();

routes.get('/games', GamesController.all);
routes.get('/games/:id', GamesController.show);

module.exports = routes;
