const request = require('supertest');
const express = require('express');

const notFound = require('../../app/middlewares/not-found');
const routes = require('../../routes');

const app = express();

app.use(routes);
app.use(notFound);

describe('GET /sdaf - not found', () => {
  test('Response expected to be a JSON: error', (done) => {
    request(app)
      .get('/sdaf')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /games', () => {
  test('Response expected to be a JSON', (done) => {
    request(app)
      .get('/games')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /games/:id', () => {
  test('Response expected to be a JSON', (done) => {
    request(app)
      .get('/games/2')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /games/:id', () => {
  test('Response expected to be a JSON', (done) => {
    request(app)
      .get('/games/2233')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});
