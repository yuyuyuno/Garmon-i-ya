const onListening = (server) => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Server is listening on ${bind}`);
}

module.exports = onListening;
