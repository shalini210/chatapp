const mongoose = require("mongoose")

let studentSchema  = mongoose.Schema(
    {
        name: 
        {type:  String,
            required:true},

//          name: {
//     type: String,
//     required: true
//   }
        age:
        { type:Number,
            required:true,
               min:  [1, 'atleast 1 '],
             max:  [120,"max 120"]},
        city:String    
    }
)
let studentModel = new mongoose.model('student',studentSchema)
module.exports=(studentModel)