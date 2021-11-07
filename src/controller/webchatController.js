const startMessage = (_req, res) => {
  res.status(200).render('chatRoom', {
    admin: 'V',
    message: 'Bem vindo ao primeiro teste desta aplicação',
  });
};

module.exports = {
  startMessage,
};