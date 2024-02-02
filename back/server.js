var createError = require("http-errors");
var express = require("express");
const { createServer, get } = require("node:http");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const { Server } = require("socket.io");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const server = createServer(app);
const io = new Server(server);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const connectedSockets = {};

function refreshUserList() {
  const socketArray = Object.values(connectedSockets);
  const userList = socketArray.map((s) => ({ username: s.username }));
  io.emit("connected-users", userList);
}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.username = "anonimus";
  connectedSockets[socket.id] = socket;

  // send refreshed user list
  refreshUserList();

  socket.on("disconnect", () => {
    delete connectedSockets[socket.id];
    refreshUserList();
    //changeConnections(socket, io);
  });

  //socket.on("get-connected-users", () => {
  //  const socketArray = Object.values(connectedSockets);
  //  const userList = socketArray.map((s) => ({username:s.username}));
  //  socket.emit('connected-users', userList);
  //})

  socket.on("chat-message-add", (data) => {
    console.log(data);
    socket.emit("echo", "askdjfksjdfkas");
  });

  socket.on("get-my-info", (clb) => {
    const userInfo = {
      id: socket.id,
      username: socket.username,
    }
    clb(userInfo);
  });

  socket.on("set-username", (username) => {
    socket.username = username;
    refreshUserList();
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
