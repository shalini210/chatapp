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
    // {name:req.body.name,
    //     age:parseInt(req.body.age)
    //     ,city:req.body.city}
        let m = await userController.insertuser(s)
        res.send(m)
    })
// router.get("/",async(req,res)=>
// {
//     let users = await userController.getusers()
//     res.send({data:users})
// })
// router.get("/city",async (req,res)=>{
//     let data = await userController.getcities()
//     res.send(data)
// })
// router.get("/:id",async(req,res)=>
// {
//     let id = req.params.id
//     let users = await userController.getuserById(id)
//     res.send({data:users})
// })
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