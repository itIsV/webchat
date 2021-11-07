const app = require('express')();
const http = require('http');

const server = require('http').createServer(app);

const io = require('./src/sockets/ioConfig')(http);

const webchatController = require('./src/controller/webchatController');

app.set('view engine', 'ejs');
app.set('views', './src/views');

require('./src/sockets/webchat')(io);

app.get('/', webchatController.startMessage);

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
