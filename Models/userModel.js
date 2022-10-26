const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    full_name:{
        type:String,
       
    },
    user_name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true
      
    },
    password:{
        type:String,
     
    },
    company:{
        type:String
    },
    isVerify:{
      type:Boolean,
      default:false
    },
    email_verification_token:{
        type:String
    },
    password_reset_token:{
        type:String
    },
  
}, {timeStamps: true})

module.exports = mongoose.model("users", userSchema)