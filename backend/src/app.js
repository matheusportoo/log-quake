const express = require('express');
const routes = require('./routes');
const log = require('./app/middlewares/log');
const notFound = require('./app/middlewares/not-found');

const app = express();

app.use(log);
// app.use(notFound);
app.use(routes);

module.exports = app;
