import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import route from './app/routes/random';

require('dotenv').config();

const app = express(); // Connecting app to express

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(morgan('dev')); // Enabling data to be logged to console

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.DB_URL_TEST == 'DB_URL_TEST') {
  mongoose.connect(process.env.DB_URL_TEST, { useNewUrlParser: true })
    .then(() => console.log('Connection Successful'))
    .catch(error => console.error(error));
} else {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => console.log('Connection Successful'))
    .catch(error => console.error(error));
}

app.use('/contacts', route);

app.use((req, res, next) => {
  // Error Handling
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    Error: error.message,
  });
});

server.listen(port);

export default app;
