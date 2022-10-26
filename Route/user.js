const express = require("express")
const router = express.Router()
const { signUp, VerifyUser, getAllUsers, signIn } = require("../Controller/user")

router
.route("/")
.post(signUp)
.get(getAllUsers)

router.route('/verify/:id/:token').get(VerifyUser)
.post(signIn)

 module.exports = router