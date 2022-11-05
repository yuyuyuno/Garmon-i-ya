const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');

const { handleListening, errorHandler, normalizePort } = require('./helpers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', errorHandler);
server.on('listening', () => handleListening(server));

module.exports = app;
