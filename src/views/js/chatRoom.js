const socket = window.io();
let nickname;

const setNickname = (nicknameValue) => {
  const currentNickname = document.querySelector('.invisibleNickname');
  currentNickname.innerHTML = nicknameValue;
  socket.emit('changeNickname', nicknameValue);
};

const setPlaceholder = (inputValue) => {
  const nicknameInput = document.querySelector('[data-testid="nickname-box"]'); // source: https://github.com/testing-library/dom-testing-library/issues/76
  
  if (!inputValue) {
    const aValue = document.querySelector('[data-testid="nickname-box"]').value;
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
  const input = document.querySelector('[data-testid="message-box"]');
  const chatMessage = input.value;
  e.preventDefault();
  socket.emit('message', { chatMessage, nickname });
  input.value = '';
});

socket.on('message', (formattedMessage) => {
  const ul = document.querySelector('#ulForMessages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = formattedMessage;
  ul.appendChild(li);
});