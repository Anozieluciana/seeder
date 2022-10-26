const user = require("../Models/userModel")
const validateUser = require("../Validations/joi")
const crypto = require("crypto")
const { bcryptHash, bycrptCompare } = require("../MiddleWare/Bcrypt")
const jwt = require("jsonwebtoken")
const verifiedModel = require("../Models/verifiedModel")
const sendMail = require("../MailOption/mailer")
const nodemailer = require("nodemailer")



const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
});

const signUp = async (req, res)=>{
	try{
		const {error} = validateUser(req.body)
		if(error){
			res.status(409).json({
				status:"failed",
				message:error.details[0].message
			})
			
		}
		const userExist = await user.findOne({email:req.body.email})
			if (userExist){
				res.status(201).json({
				message:"user already exist, try logging in"
					})
				}
				const userToken = crypto.randomBytes(64).toString('hex')
				// const getUserToken =jwt.sign({name: user.full_name}, "TheismySecret", {expiresIn: "3d"})
				const getUserToken =jwt.sign({userToken}, "TheismySecret", {expiresIn: "3d"})
				const salted = await bcryptHash(req.body.password)
			const myUser = await user.create({
				full_name: req.body.full_name,
				user_name:req.body.user_name,
				password: salted,
				company:req.body.company,
				email_verification_token:getUserToken,
				email: req.body.email,
				password_reset_token:salted
			})

			await verifiedModel.create({
				email_verification_token:getUserToken,
				userId: user._id,
				id:user._id
			})
			
			// const mailOptiions = {
			// 	from:"no-reply@gmail.com",
			// 	to: email,
			// 	subject:"Account Verification",
			// 	html:`
			// 	<h3>
			// 		Thanks for signing up with us ${user.full_name}, please use this <a href='http://localhost:2122/api/user/${user._id}/${getUserToken}'
			// 		>Link to complete your sign up process
			// 		</a>
			// 	</h3>
			// 	`,
			// };
			// transport.sendMail(mailOptiions, (error, info) =>{
			// 	if(error){
			// 		console.log(error.message);
			// 	}else{
			// 		console.log(`message sent to your mail ${info.response}`);
			// 	}
			// });

			res.status(200).json({
				status:"success",
				data:myUser
			})
	}
	catch(error){
		// next(error)
			res.status(404).json({
				status:"failed",
				message:error.message
			})
	}
}


// const 	VerifyUser= async (req, res) =>{
//     try{
//         const isUser = await user.findById(req.params.id);
//         if(user){
//             if(isUser.email_verification_token !== ""){
//                 await user.findByIdAndUpdate(isUser._id, {
// 					isVerify:true,
//                     email_verification_token:"",
//                 }, {new: true});

//                 await verifiedModel.findByIdAndUpdate(isUser._id, {
//                     userID: isUser._id,
//                     email_verification_token:"",
//                 }, {new: true});

// 				const message = `${process.env.BASE_URL}/api/user/${user._id}/${getUserToken}`
// 		await sendMail(user.email, "verify Email", message)

//                 res.status(201).json({
//                     message:"verification complete., check your email to continue"
//                 })
//             }else{
//                 res.status(404).json({
//                     message: error.message,
//                 })
//             }
//             }else{
//                 res.status(404).json({ 
//                     message: error.message,
//                 })
//             }
//     }catch(error){
//     res.status(404).json({
//         message: error.message
//     })
//     }
// };

const VerifyUser = async(req, res, next) =>{
	try{
		const user = await user.findOne({_id: req.params.id});
		if(!user) return result.status(400).send("invalid link")

		const token = await verifiedModel.findOne({
			userId: user._id,
			email_verification_token: req.params.email_verification_token
		});
		if(!token) return res.status(400).send("invalid link");

		await user.updateOne({_id: user._id, isVerify:true});
		await verifiedModel.findByIdAndRemove(token._id)

		res.send("email verified succesfully")
	}
	catch(error){
		next(error)
	}
}

const getAllUsers = async(req, res, next)=>{
	try{
		const allUsers = await user.find()
		res.status(200).json({
			status:"success",
			data:allUsers
		})
	}
	catch(error){
		next(error)
	}
}


const signIn = async(req, res, next)=>{
	try{
		// const {error} = validateUser(req.body)
		// if(error){
		// 	res.status(409).json({
		// 		status:"failed",
		// 		message:error.details[0].message
		// 	})
			
		// }
		const isUser = await user.findOne({email:req.body.email})
		if(isUser){
			const pass = await bycrptCompare(req.body.password, isUser.password)

			if(pass){
				const {password, ...info} = isUser._doc
				const token = jwt.sign({isUser},  "TheismySecret", {expiresIn: "3d"})
				res.status(200).json({
					status:"successfully signedIn",
					data:{token, ...info}
				})
				
			}else{
				res.status(404).json({message:"incorrect password"})
			}
		}else{
			res.status(404).json({message:"incorrect password"})
		}
		
		
	}
	catch(error){
		next(error)
	}
}


module.exports={
	signUp,
	getAllUsers,
	VerifyUser,
	signIn
}