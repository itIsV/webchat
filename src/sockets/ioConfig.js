const socketIo = require('socket.io');

module.exports = (http) => {
  const io = socketIo(http, {
      cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
      },
    });

  return io;
};
