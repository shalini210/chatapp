const userModel = require("../models/userModel")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "shalini.rathore210@gmail.com",
    pass: "gqrv vuwl oayn ripe",
  },
});


exports.insertuser =async (s)=>
{
    var msg = "blank";
    let totp = Math.round(Math.random()*10000)
    let user = new userModel({
         name:s.name,      
         email:s.email,
         password:s.password,
         verified:  false,
         otp:totp
    })
   await user.save()
    .then(()=>{( async  () => {
  const info = await transporter.sendMail({
    from: '"shalini rathore" <shalini.rathore210@gmail.com>',
    to: s.email,
    subject: "Account Verification",
    text: `please enter OTP: ${totp} to verify user account`, // plain‑text body
    // html: "<b>Hello world?</b>", // HTML body
  })
  
})();

msg = "User REgistered , please verfiy OTP Sent on your email"
    })     
    .catch((err)=>msg = "err occured"+err)
    // let data = [];
    // if(msg=="Record Inserted")
    // {
    //     await userModel.find()
    //     .then((d)=>data=d)
    // }
    return {msg:msg }
}
// exports.getusers = async()=>
// {
//     let users = [];
//     await userModel.find()        //.sort({name:1}) //.distinct("city")
//     .then((d)=>users=d)
//     .catch((e)=>users = e)
//     return users
// }
// exports.getcities = async()=>
// {
//     let data = await userModel.distinct("city")
//     return data
// }
// exports.getuserById =async (id)=>
// {
//     let users = [];
//     await userModel.findById(id)
//     .then((d)=>users=d)
//     .catch((e)=>users = e)
//     return users
// }
exports.Verifieduser = async (email,otp)=>
{
    let msg = "";
    let data = []
    await userModel.find({email:email})
     .then(async (d)=>
        {console.log(d);
        if(d.length==0){
            msg = "usernot Found"
        }
        else if(d[0].otp ==parseInt(otp))
        {
            await userModel.updateOne({email:email},{$set:{verified:true}})
            .then(async (d)=>{
                msg = "User Verified"
        
         })
        .catch((err)=>msg = err)    
         }
         else
            {
                msg = "Wrong OTP "
            }
        })
    
        return {msg:msg}
}
// exports.deleteuser = async(id)=>
// {
//     let msg = "";  
//     let data = [];
//     await userModel.findByIdAndDelete(id)
//     .then(async (d)=>
//         {
//             msg="record delete"
//             await userModel.find()
//         .then((da)=>data = da)
//     }
//     )
//     .catch((err)=>msg = err)
//     return {msg:msg,data:data} 
// }