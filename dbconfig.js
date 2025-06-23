const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/internship")
.then(()=>console.log("db connected "))
.catch(()=>console.log("connnection failed"))