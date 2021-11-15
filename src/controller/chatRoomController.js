const { getMessages } = require('../models/chatRoomModel');

const startWebchat = async (_req, res) => {
  const messages = await getMessages();

  res.status(200).render('chatRoom', { messages }); 
};

module.exports = {
  startWebchat,
};