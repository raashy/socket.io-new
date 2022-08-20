const express = require('express');

const PORT = process.env.PORT || 8080;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server, {
  cors: {origin: '*'}
} )

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.on("text-change", (delta) => {
    console.log(delta);
    socket.broadcast.emit("update", delta);
  })
});
