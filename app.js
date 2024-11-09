const Server = require('./src/models/server.js')

const server = new Server();

server.isPathReport();
server.listen();