const express =require("express");
const app=express();
const {chats} =require("./Data/Data")
const dotenv=require("dotenv")

dotenv.config()
app.get("/",(req,res)=>{
    res.send("API is running")
});

app.get('/api/chat',(req,res)=>{
    res.send(chats)
    
});

app.get("/api/chat/:id",(req,res)=>{
    //res.send(req.params.id);
    const singleChat=chats.find((e)=>e._id === req.params.id);
    res.send(singleChat);
   
})

const PORT =process.env.PORT
app.listen(3000,console.log(`server started on PORT ${PORT}`));