const socket = window.io();
const DATA_TESTID = 'data-testid';
const NICKNAME_BOX = document.querySelector('[data-testid="nickname-box"]');
const MESSAGE_BOX = document.querySelector('[data-testid="message-box"]');

const removeSessionUser = (users, sessionUser) => {
  users
  .splice(users.indexOf(sessionUser), 1);
};

const setAnotherUserLi = (users, ul) => {
  users
  .forEach((newUser) => {
    const li = document.createElement('li');
    li.setAttribute(DATA_TESTID, 'online-user');
    li.innerText = newUser;
    
    ul.appendChild(li);
  });
};

const removeUlChilds = (ul) => { // source: https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
  let ulChild = ul.lastElementChild; 
  
  while (ulChild) {
    ul.removeChild(ulChild);
  
    ulChild = ul.lastElementChild;
  } 
};

const setFirstUserLi = (ul, nickname) => {
  const li = document.createElement('li');
  li.setAttribute(DATA_TESTID, 'online-user');
  li.innerText = nickname;

  ul.appendChild(li);
}; 

const emitMessage = (event) => {
  const { nickname } = sessionStorage;

  const chatMessage = MESSAGE_BOX.value;

  event.preventDefault();

  socket.emit('message', { chatMessage, nickname });

  MESSAGE_BOX.value = '';
};

const setNickname = (nicknameValue) => {
  sessionStorage.nickname = nicknameValue;

  socket.emit('changeNickname', nicknameValue);
};

const setPlaceholder = (inputValue = NICKNAME_BOX.value) => {    
  setNickname(inputValue);
  
  NICKNAME_BOX.setAttribute('placeholder', inputValue);
  NICKNAME_BOX.value = '';
};

socket.on('connect', () => {
  setPlaceholder(`User-${socket.id.slice(9)}`);
});

document.addEventListener('submit', emitMessage);

socket.on('message', (formattedMessage) => {
  const ul = document.getElementById('ulForMessages');

  const li = document.createElement('li');
  li.setAttribute(DATA_TESTID, 'message');
  li.innerText = formattedMessage;

  ul.appendChild(li);
});

socket.on('setOnlineUsers', (users) => {
  const { nickname } = sessionStorage;

  const ul = document.getElementById('ulForOnlineUsers');

  removeUlChilds(ul);

  removeSessionUser(users, nickname);

  setFirstUserLi(ul, nickname);

  setAnotherUserLi(users, ul);
});
