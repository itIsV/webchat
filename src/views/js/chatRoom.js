const socket = window.io();
socket.on('connect', () => {
  const nickname = `User-${socket.id.slice(9)}`;
  
  document.addEventListener('submit', (e) => {
    console.log(nickname);
    const input = document.querySelector('input');
    const chatMessage = input.value;
    e.preventDefault();
    socket.emit('message', { chatMessage, nickname });
    input.value = '';
  });
  socket.on('message', (formattedMessage) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = formattedMessage;
    ul.appendChild(li);
  });
});