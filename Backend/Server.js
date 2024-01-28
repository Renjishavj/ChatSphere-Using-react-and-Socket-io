const express = require("express");
const app = express();
app.use(express.json()); //to accept json data from our frontend
const { chats } = require("./Data/Data");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const messageRoutes = require("./Routes/messageRoutes");
const path=require("path")

dotenv.config();
connectDB();
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//---------------------------------------deployment----------
const _dirname1=path.resolve();
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(_dirname1,'/chatsphere/build')));

    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(_dirname1,"chatsphere","build","index.html"));
    })
} else{
  app.get("/",(req,res)=>{
    res.send("API is running")
  })
}
//---------------------------------------deployment----------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(3300, console.log(`server started on PORT ${PORT}`));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});