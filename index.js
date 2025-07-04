const express = require("express")
const config = require("./dbconfig")
const app = express()
const userRouter = require("./routers/userRouter")
const {join} = require("path")
const cors = require("cors")
const { createServer } = require('http');
const server = createServer(app);
const { Server } = require('socket.io');
const io = new Server(server,()=>
{
  connectionStateRecovery:{}
});
const users= []



app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/login",(req,res)=>
{
  res.sendFile(__dirname+"/login.html")
})
app.get("/verifyOTP",(req,res)=>
{
  res.sendFile(__dirname+"/verifyOTP.html")
})
app.get("/verifyOTP/:email",(req,res)=>
{
  res.redirect("/verifyOTP?email="+req.params.email)
  // res.sendFile(__dirname+`/verifyOTP.html?email=${req.params.email}`)
})

app.get("/registration",(req,res)=>
{
  res.sendFile(__dirname+"/registration.html")
})
app.get("/home",(req,res)=>
{
  res.sendFile(__dirname+"/home.html")
})

app.get("/",(req,res)=>
{
    res.sendFile(join(__dirname,"MainHome.html"))
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
let onlineUsers=[]
  
io.on('connection', (socket) => {
  let socketid = socket.id
  console.log('a user connected id: '+ socket.id);
  socket.on("ClientName",(data)=>
  {
    let id = data.id;
    let index = onlineUsers.findIndex((u)=>u.id===id)
  
    if(index == (-1))
    {
    onlineUsers.push({username:data.username,id:data.id,
      socketId:socket.id
    })
  }
  else
  {
    onlineUsers[index].socketId=socket.id
  }
    console.log(onlineUsers)
    io.emit("onlineUsers",(onlineUsers))
  })

  socket.on("ClientMsg",(data)=>
  {
    console.log("message : "+data.msg)
    var to = "";
    if(data.to!="")
    {
      to="@"+data.to
    }
    let msg = data.username +" :  "+to +" "+ data.msg
    io.emit("serverMsg",msg)
  
  })
  //  socket.on('refresh', () => {
  //   console.log(socket.id)
    
  //   let index = onlineUsers.findIndex((u)=>u.socketId==socketid)
  //   console.log("on index valeu" +index)
  //   onlineUsers.splice(index,1)
  //  io.emit("onlineUsers",(onlineUsers))
  //   console.log(index)
  //   console.log('user disconnected');
  // });
  
});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
}); 