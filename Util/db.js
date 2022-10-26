const mongoose = require("mongoose")
const util = "mongodb://localhost/seederQuestionaireDB"

mongoose.connect(util).then(()=>{
    console.log("connected database")
}).catch((error)=>{
    console.log(error.message)
})