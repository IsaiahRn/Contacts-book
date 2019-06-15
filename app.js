import express from 'express';

import bodyParser from 'body-parser';

import morgan from 'morgan';

import http from 'http';

const app = express(); // Connecting app to express

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port);
