const Joi = require('joi');

const registerValidation = (req, res, next) => {
	const UserValidation = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	const { error } = UserValidation.validate(req.body);
	if (error) {
		return res.status(400).json({
			message: 'Register failed',
			errorCode: 400,
			error: error.details,
		});
	}
	next();
};

module.exports = registerValidation;
