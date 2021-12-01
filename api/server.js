const express = require('express');

const AuthRouter = require('ROUTER NAME LOCATION HERE');
const UsersRouter = require('ROUTER NAME LOCATION HERE');
const RecipesRouter = require('ROUTER NAME LOCATION HERE');

const server = express();

server.use(express.json());
server.use('/api/auth', AuthRouter);
server.use('/api/users', UsersRouter);
server.use('/api/recipes', RecipesRouter);

module.exports = server;
