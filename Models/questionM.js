const mongoose = require("mongoose")

const question = mongoose.Schema({
    question:{
        type:String,
        required:true
    },
   options:
    {
            type:Array,
            required:true
    },
   answer:{
        type:String
   },

   category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    }
  
    
})


module.exports = mongoose.model("questions", question)