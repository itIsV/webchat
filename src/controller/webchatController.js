const startWebchat = (_req, res) => {
  res.status(200).render('chatRoom'); 
};

module.exports = {
  startWebchat,
};