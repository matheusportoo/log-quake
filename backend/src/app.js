const express = require('express');
const routes = require('./routes');
const log = require('./app/middlewares/log');

const app = express();

app.use(log);
app.use(routes);

module.exports = app;
