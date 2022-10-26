const mongoose = require("mongoose")
const question = require("../Models/questionM")

mongoose.connect("mongodb://localhost/seederQuestionaireDB", {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>{
        console.log("connected database")
    }).catch((error)=>{
        console.log(error.message)
    })

const seedQuestion1 = [
  {
      question:"ceo of kora",
      options:[
          {
              text:"dickson",
              isCorrect:true
          },
          {
              text:"lu",
              isCorrect:false
          },
          {
              text:"lu",
              isCorrect:false
          },
          {
              text:"lu",
              isCorrect:false
          },
      ],
      answer:"dickson",
      category_id:"6346d09caf896d4e0e45e8ad"
  },
]
const seedQuestion2 = [
  {
      question:"ceo of fincra",
      options:[
          {
              text:"mathew",
              isCorrect:true
          },
          {
              text:"ma",
              isCorrect:false
          },
          {
              text:"john",
              isCorrect:false
          },
          {
              text:"kaleb",
              isCorrect:false
          },
      ],
      answer:"mathew",
      category_id:"6346d09caf896d4e0e45e8ad"
  },
]
const seedQuestion3 = [
  {
      question:"ceo of fincra",
      options:[
          {
              text:"mathew",
              isCorrect:true
          },
          {
              text:"ma",
              isCorrect:true
          },
          {
              text:"john",
              isCorrect:false
          },
          {
              text:"kaleb",
              isCorrect:false
          },
      ],
      answer:"ma",
      category_id:"6346d09caf896d4e0e45e8ad"
  },
]


const seedDB = async () =>{
  await question.deleteMany()
  await question.insertMany(seedQuestion1)
  await question.insertMany(seedQuestion2)
  await question.insertMany(seedQuestion3)
}

seedDB().then(()=>{
  mongoose.connection.close
})