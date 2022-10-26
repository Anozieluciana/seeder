require("./Util/db")
const express = require("express")
const cors = require("cors")
const port = 2122
const userRoute = require("./Route/user")

const app = express();
app.use(cors())
app.use(express.json())
// app.get("/", (req,res)=>{
//     res.json("let go to postman")
// })
app.use("/api", userRoute)

app.listen(port, ()=>{
    console.log("listening to server, port: " + port)
})