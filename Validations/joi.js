const joi= require('@hapi/joi')

const validateUser = (data) =>{
	const joiuser = joi.object({
			full_name: joi.string().min(5).max(30).required(),
		    user_name: joi.string().min(5).max(30).required(),
		    email: joi.string().required().email().min(3),
		    password: joi.string().min(5).max(10).required(),
		    company: joi.string().min(5).required()
	})
	return joiuser.validate(data)
}

module.exports = validateUser