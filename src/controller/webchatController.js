const startMessage = (_req, res) => {
  res.status(200).render('chatRoom'); 
};

module.exports = {
  startMessage,
};