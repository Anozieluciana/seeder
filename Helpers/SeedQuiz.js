const mongoose = requiere("mongoose")
const quiz = require("../Models/Quiz")

mongoose.connect("mongodb://localhost/seederQuestionaireDB", {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>{
        console.log("connected database")
    }).catch((error)=>{
        console.log(error.message)
    })


    const seedQuiz = [
        {
            score:0,
            status:"",
            
        }
    ]