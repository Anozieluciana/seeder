const mongoose = require("mongoose")
const category = require("../Models/Categories")



mongoose.connect("mongodb://localhost/seederQuestionaireDB", {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>{
        console.log("connected database")
    }).catch((error)=>{
        console.log(error.message)
    })

const seedCategory =[
    { 
        name:"quidax"
    },
    {
        name:"fincra"
    },
    {
        name:"kora"
    },
    {
        name:"thecurveafrica"
    },
];




const seedDB = async () =>{
    await category.deleteMany()
    await category.insertMany(seedCategory)
}

seedDB().then(()=>{
    mongoose.connection.close()
})