import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import contactRoutes from './app/routes/contacts';

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

// Routes which should handle requests
app.use("/contacts", contactRoutes);

app.use((req, res, next) => {
  // Error Handling
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error: error.message,
  });
});

server.listen(port);
