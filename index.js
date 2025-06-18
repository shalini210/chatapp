const express = require("express")
const { createServer } = require('http');
const app = express()
const server = createServer(app);
const {join} = require("path")

const { Server } = require('socket.io');

const io = new Server(server);

app.get("/",(req,res)=>
{
    res.sendFile(join(__dirname,"index.html"))
})
io.on('connection', (socket) => {
  console.log('a user connected id: '+ socket.id);
   socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});