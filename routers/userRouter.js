const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()
router.post("/",async(req,res)=>
{
    let s = 
    {
         name:req.body.name,      
         email:req.body.email,
         password:req.body.password,                   
    }

        let m = await userController.insertuser(s)
        res.send(m)
    })
router.get("/userhome/:id",(req,res)=>
{
  
  res.send("this is for get of demo ")
})
router.get("/login",async(req,res)=>
{
  // res.redirect("/user/fordemo");
    res.sendFile(__dirname+"/loginform.html")
})
router.post("/login",async (req,res)=>
{
  let d = await  userController.loginuser(req.body)
  if(d.msg =="login success")
  {
    res.redirect("/user/userhome/"+d.user._id)
  }
  else
  {
    res.sendFile(__dirname+"/loginform.html")
  }
//   login success"
//   }
//   else
// {
//   msg = "invalid user"
})
router.put("/",async(req,res)=>
{
      let email = req.body.email;
      let otp = req.body.otp
        let m = await userController.Verifieduser(email,otp)
        res.send(m)  
})
// router.delete("/:id",async(req,res)=>
// {
//     let id = req.params.id;
//     let msg = await userController.deleteuser(id)
//     res.send(msg)
// })
module.exports = router