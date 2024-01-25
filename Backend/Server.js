const express =require("express");
const app=express();
app.use(express.json())//to accept json data from our frontend
const {chats} =require("./Data/Data")
const dotenv=require("dotenv")
const connectDB=require("./Config/db")
const  userRoutes=require('./Routes/userRoutes');
const chatRoutes=require("./Routes/chatRoutes")
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const messageRoutes=require('./Routes/messageRoutes')


dotenv.config();
connectDB();
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)
app.get("/",(req,res)=>{
    res.send("API is running")
});

app.use(notFound)
app.use(errorHandler)


const PORT =process.env.PORT
app.listen(3300,console.log(`server started on PORT ${PORT}`));
