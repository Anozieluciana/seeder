const mongoose = require("mongoose")

const quiz = mongoose.Schema({
  score:{
    type:Number
  },
  status:{
    type:String
  },
  expires_at:{
    type:Date.now()
  },
  completed_at:{
    type:Date.now(),
    
  },
   category_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
  },
   user_id:
    {
        type:mongoose.Schema.Types.ObjectId,
      ref:"user"
  },
  questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"question" 
        }
  ]
    
}, {timeStamps:true})


module.exports = mongoose.model("quizs", quiz)