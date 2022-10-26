const mongoose = require("mongoose")

const verified = mongoose.Schema({
    email_verification_token:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, {timeStamps:true})


module.exports= mongoose.model("verifyToken", verified)

