const http = require('http').createServer()

const io = require('socket.io')(http, {
  cors: {origin: '*'}
} )

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("Text-change", (data) => {
   
    socket.broadcast.emit("change", data);
  })
});

http.listen(3000 || process.env.PORT);