const socket = window.io();
let nickname;

const setNickname = (nicknameValue) => {
  const currentNickname = document.querySelectorAll('span')[1];
  currentNickname.innerHTML = nicknameValue;
  socket.emit('changeNickname', nicknameValue);
};

const setPlaceholder = (inputValue) => {
  const nicknameInput = document.querySelectorAll('input')[0];
  
  if (!inputValue) {
    const aValue = document.querySelectorAll('input')[0].value;
    setNickname(aValue);
    nicknameInput.value = '';
    return nicknameInput.setAttribute('placeholder', aValue);
  }
  
  setNickname(inputValue);
  nicknameInput.setAttribute('placeholder', inputValue);
};

socket.on('connect', () => {
  nickname = `User-${socket.id.slice(9)}`;
  setPlaceholder(nickname);
});

socket.on('changeNickname', (nicknameValue) => {
  nickname = nicknameValue;
});

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