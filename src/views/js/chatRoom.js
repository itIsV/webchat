const socket = window.io();
const setPlaceholder = (value) => {
  const nicknameInput = document.querySelectorAll('input')[0];
  console.log('oi fora do if');
  
  if (!value) {
    const aValue = document.querySelectorAll('input')[0].value;
    console.log('dentro do if aValue: ', aValue);
    nicknameInput.value = '';
    return nicknameInput.setAttribute('placeholder', aValue);
  }

  nicknameInput.setAttribute('placeholder', value);
};

socket.on('connect', () => {
  const nickname = `User-${socket.id.slice(9)}`;
  setPlaceholder(nickname);

  document.addEventListener('submit', (e) => {
    const input = document.querySelectorAll('input')[1];
    const chatMessage = input.value;
    e.preventDefault();
    socket.emit('message', { chatMessage, nickname });
    input.value = '';
  });
  socket.on('message', (formattedMessage) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = formattedMessage;
    ul.appendChild(li);
  });
});