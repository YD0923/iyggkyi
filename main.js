const socket = io();

// 기존 메시지를 받아서 표시
socket.on('init messages', function(messages) {
  const messagesContainer = document.getElementById('messages');
  messages.forEach((messageWithTime) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${messageWithTime.msg} (${messageWithTime.timestamp})`;
    messagesContainer.appendChild(messageElement);
  });
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// 새로운 메시지를 받아서 표시
socket.on('chat message', function(messageWithTime) {
  const messages = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${messageWithTime.msg} (${messageWithTime.timestamp})`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});
