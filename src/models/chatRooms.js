const connection = require('./connection');

const sendMessages = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  sendMessages,
  getMessages,
};
