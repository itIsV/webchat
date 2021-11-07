module.exports = (io) => io.on('connection', (socket) => {
  socket.on('start', (message) => console.log(message));
});