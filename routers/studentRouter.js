const express = require("express")
const studentController = require("../controllers/studentController")
const router = express.Router()
router.post("/",async(req,res)=>
{
    let s = {name:req.body.name,
        age:parseInt(req.body.age)
        ,city:req.body.city}
        let m = await studentController.insertStudent(s)
        res.send(m)
    })
router.get("/",async(req,res)=>
{
    let students = await studentController.getStudents()
    res.send({data:students})
})
router.get("/city",async (req,res)=>{
    let data = await studentController.getcities()
    res.send(data)
})
router.get("/:id",async(req,res)=>
{
    let id = req.params.id
    let students = await studentController.getStudentById(id)
    res.send({data:students})
})
router.put("/",async(req,res)=>
{
    let id = req.body.id;
  let s = {name:req.body.name,
        age:parseInt(req.body.age)
        ,city:req.body.city}
        let m = await studentController.updateStudent(id,s)
        res.send(m)  
})
router.delete("/:id",async(req,res)=>
{
    let id = req.params.id;
    let msg = await studentController.deleteStudent(id)
    res.send(msg)
})
module.exports = router