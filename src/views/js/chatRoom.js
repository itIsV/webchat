const socket = window.io();
const DATA_TESTID = 'data-testid';

const setNickname = (nicknameValue) => {
  socket.emit('changeNickname', nicknameValue);
};

const setPlaceholder = (inputValue =
  document.querySelector('[data-testid="nickname-box"]').value) => {
  const nicknameInput = document.querySelector('[data-testid="nickname-box"]'); // source: https://github.com/testing-library/dom-testing-library/issues/76
    
  setNickname(inputValue);
  
  nicknameInput.setAttribute('placeholder', inputValue);
  nicknameInput.value = '';
};

socket.on('connect', () => {
  sessionStorage.setItem('nickname', `User-${socket.id.slice(9)}`);

  setPlaceholder(sessionStorage.nickname);
});

socket.on('changeNickname', (nicknameValue) => {
  sessionStorage.nickname = nicknameValue;
});

document.addEventListener('submit', (e) => {
  const { nickname } = sessionStorage;

  const input = document.querySelector('[data-testid="message-box"]');
  const chatMessage = input.value;

  e.preventDefault();
  socket.emit('message', { chatMessage, nickname });

  input.value = '';
});

socket.on('message', (formattedMessage) => {
  const ul = document.querySelector('#ulForMessages');

  const li = document.createElement('li');
  li.setAttribute(DATA_TESTID, 'message');
  li.innerText = formattedMessage;

  ul.appendChild(li);
});

const removeUlChilds = (ul) => { // source: https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
  let ulChild = ul.lastElementChild; 
  while (ulChild) {
      ul.removeChild(ulChild);
      ulChild = ul.lastElementChild;
  } 
};

  const setFirstLi = (ul, nickname) => {
    const li = document.createElement('li');
    li.setAttribute(DATA_TESTID, 'online-user');
    li.innerText = nickname;

    ul.appendChild(li);
  }; 

socket.on('setOnlineUsers', (users) => {
  const { nickname } = sessionStorage;
  const ul = document.querySelector('#ulForOnlineUsers');

  removeUlChilds(ul);

  setFirstLi(ul, nickname);

  users
  .splice(users.indexOf(nickname), 1);

  users
  .forEach((newUser) => {
    const li = document.createElement('li');
    li.setAttribute(DATA_TESTID, 'online-user');
    li.innerText = newUser;
    
    ul.appendChild(li);
  });
});