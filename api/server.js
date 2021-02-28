const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const plantsRouter = require('./plants/router');
const usersRouter = require('./users/router');
const authRouter = require('./auth/auth-router');

server.use('/api/plants', plantsRouter);
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (_, res) => {
  res.send('The API is running! You should go catch it! 🏃‍');
});

server.use('*', (_, res) => {
  res.status(404).json({ message: '404: Resource not found' });
});

module.exports = server;
