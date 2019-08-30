const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const log = require('./app/middlewares/log');
const notFound = require('./app/middlewares/not-found');

const app = express();

app.use(cors())
app.use(log);
app.use(routes);
app.use(notFound);

module.exports = app;
