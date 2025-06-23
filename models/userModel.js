const mongoose = require("mongoose")

let userSchema  = mongoose.Schema(
    {
         name:  {type:  String,
            required:true},
         email:  {type:  String,
            required:true},
         password:  {type:  String,
            required:true},
         verified:  {type:  Boolean,
            required:true},
         datetime: { type: Date, default: Date.now },
            otp:{type:Number}
       
    }
)
let userModel = new mongoose.model('user',userSchema)
module.exports=(userModel)