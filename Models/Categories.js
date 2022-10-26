const mongoose = require("mongoose")

const category = mongoose.Schema({
    name:
        {
            type:String,
            required:true,
            trim:true
        }

 
}, {timeStamps:true})


module.exports = mongoose.model("categories", category)