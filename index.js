// const express = require("express");
// const app = express();
// let port = process.env.PORT || 4000;

// app.get("/", (req, res) => {
//   res.send("Hello world");
//   console.log("hello world");
// });

// app.listen(port, () => {
//   console.log(`Example app is listening on port http://localhost:${port}`);
// });

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");

app.use(cors());

app.get("/", (req, res, next) => {
  res.end("hello express");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.broadcast.emit("new-user", "a user connected");

  socket.on("new-color", (color) => {
    console.log("new color: " + color);
    socket.broadcast.emit("receive-color", color);
  });

  socket.on("new-user-name", (userName) => {
    console.log("new user name: " + userName);
    socket.broadcast.emit("receive-user-name", userName);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnect-user", "a user disconnected");
    console.log("a user disconnected");
  });
});

http.listen("4000", () => {
  console.log("listening on *:4000");
});
