const dateString = (date) => {
  const { year, month, day, hour, minutes, seconds, pmOrAm } = date;
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds} ${pmOrAm}`;
};
const dateFarmatter = (date) => { // source : https://blog.betrybe.com/javascript/javascript-date-format/ && https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format && https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCHours
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  let hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const pmOrAm = (hour >= 0 && hour < 12) ? 'am' : 'pm';
  const formatedHour = hour % 12;
  hour = (formatedHour) || '00';
  month = (month < 10) ? `0${month}` : month; 

  const formatedDate = dateString({ year, month, day, hour, minutes, seconds, pmOrAm });
  return formatedDate;
  };
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
      const currentDate = new Date(Date.now());
      const formattedMessage = `${dateFarmatter(currentDate)} ${nickname}: ${chatMessage}`;
      
      io.emit('message', formattedMessage);
  });
});