const studentModel = require("../models/studentModel")

exports.insertStudent =async (s)=>
{
    var msg = "blank";
    let studnet = new studentModel({
        name:s.name,
        age:s.age,
        city:s.city
    })
   await studnet.save()
    .then(()=>{msg = "Record Inserted"})     
    .catch((err)=>msg = "err occured"+err)
    let data = [];
    if(msg=="Record Inserted")
    {
        await studentModel.find()
        .then((d)=>data=d)
    }
    return {msg:msg,data:data }
}
exports.getStudents = async()=>
{
    let students = [];
    await studentModel.find()        //.sort({name:1}) //.distinct("city")
    .then((d)=>students=d)
    .catch((e)=>students = e)
    return students
}
exports.getcities = async()=>
{
    let data = await studentModel.distinct("city")
    return data
}
exports.getStudentById =async (id)=>
{
    let students = [];
    await studentModel.findById(id)
    .then((d)=>students=d)
    .catch((e)=>students = e)
    return students
}
exports.updateStudent = async (id,newdata)=>
{
    let msg = "";
    let data = []
    await studentModel.findByIdAndUpdate(id,{$set:newdata})
    .then(async (d)=>{
        msg = "REcord updated"
        await studentModel.find()
        .then((da)=>data=da)
    })
    .catch((err)=>msg = err)
    
    return {msg:msg,data:data }
}
exports.deleteStudent = async(id)=>
{
    let msg = "";  
    let data = [];
    await studentModel.findByIdAndDelete(id)
    .then(async (d)=>
        {
            msg="record delete"
            await studentModel.find()
        .then((da)=>data = da)
    }
    )
    .catch((err)=>msg = err)
    return {msg:msg,data:data} 
}