const express = require('express');
const path = require('path');
const cors = require('cors');

// routes T O D O

const { handleListening, errorHandler, normalizePort } = require('./helpers');

const port = normalizePort(process.env.PORT || '9000');
const server = express();

server.use(cors());
server.use(express.json());
// server.use(routes);
server.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => handleListening(server));

module.exports = server;
