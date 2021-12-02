const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authenticate = require('../auth/restricted-middleware');

const AuthRouter = require('../routing/auth/auth-router');
const UsersRouter = require('../routing/users/users-router');
const RecipesRouter = require('../routing/recipes/recipes-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', AuthRouter);
server.use('/api/users', UsersRouter);
server.use('/api/recipes', RecipesRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;
