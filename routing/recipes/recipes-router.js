const express = require('express');
const router = express.Router();

const db = require('../../database/db-config');
const Users = require('./recipes-model');
const restricted = require('../auth/restricted-middleware');

module.exports = router;
