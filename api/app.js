const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  errorHandler(next, 404);
});

module.exports = app;
