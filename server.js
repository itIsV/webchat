const express = require('express');
const app = require('express')();

const server = require('http').createServer(app);

const io = require('./src/sockets/ioConfig')(server);

const webchatController = require('./src/controller/chatRoomController');

app.use(express.static('src'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

require('./src/sockets/chatRoom')(io);

app.get('/', webchatController.startWebchat);

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
