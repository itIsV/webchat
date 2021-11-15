const { getMessages } = require('../models/chatRooms');

const startWebchat = async (_req, res) => {
  const messages = await getMessages();
  console.log(messages);
  res.status(200).render('chatRoom', { messages }); 
};

module.exports = {
  startWebchat,
};