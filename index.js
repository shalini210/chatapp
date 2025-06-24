const express = require("express")
const config = require("./dbconfig")
const app = express()
const userRouter = require("./routers/userRouter")
const {join} = require("path")
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>
{
    res.sendFile(join(__dirname,"index.html"))
})
app.use("/user",userRouter)


app.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});