const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');

const { onListening, errorHandler, onError, normalizePort } = require('./helpers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  errorHandler(next, 404);
});

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', () => onListening(server));

module.exports = app;
