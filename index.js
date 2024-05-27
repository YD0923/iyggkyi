const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // 기존 메시지 전송
  socket.emit('init messages', messages);

  socket.on('chat message', (msg) => {
    const now = new Date();
    const timestamp = `${now.getMonth() + 1}/${now.getDate()}/${now.getHours()}/${now.getMinutes()}`;
    const messageWithTime = { msg, timestamp };
    messages.push(messageWithTime);
    io.emit('chat message', messageWithTime);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
