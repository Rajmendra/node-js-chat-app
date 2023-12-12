const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const path = require('path');
const { Server} = require("socket.io");



const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket)=>{
  console.log('A new user has connected', socket.id);
  socket.on('user-message', msg=>{
    console.log('new user message', msg);
    socket.emit('message', msg);
  })
})

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
