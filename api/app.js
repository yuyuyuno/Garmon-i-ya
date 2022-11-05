const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const server = express();

dotenv.config();

server.use(cors());
server.use(express.json());
routes.forEach((route) => server.use(route));
server.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.exports = server;
