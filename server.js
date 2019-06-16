import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';

require('dotenv').config();

const app = express(); // Connecting app to express

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(morgan('dev')); // Enabling data to be logged to console

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('Connection Successful'))
  .catch(error => console.error(error));

app.use()

server.listen(port);
