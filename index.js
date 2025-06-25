const express = require("express")
const config = require("./dbconfig")
const app = express()
const userRouter = require("./routers/userRouter")
const {join} = require("path")
const cors = require("cors")

const { createServer } = require('http');

const server = createServer(app);


const { Server } = require('socket.io');

const io = new Server(server);
const users= []



app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/login",(req,res)=>
{
  res.sendFile(__dirname+"/login.html")
})

app.get("/home",(req,res)=>
{
  res.sendFile(__dirname+"/home.html")
})

app.get("/",(req,res)=>
{
    res.sendFile(join(__dirname,"index.html"))
})
app.get("/index",(req,res)=>
{
    res.sendFile(join(__dirname,"index.html"))
})
app.use("/user",userRouter)


app.get("/chathome",(req,res)=>
{
  console.log(req.body)
    // res.redirect("/index")
    res.sendFile(join(__dirname,"index.html"))
})
io.on('connection', (socket) => {
  console.log('a user connected id: '+ socket.id);
  socket.on("chatmsg",(msg,username)=>
  {
    console.log("message : "+msg)
    io.emit("servermsg",msg,username)
  
  })
   socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});