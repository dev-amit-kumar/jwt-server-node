const Joi = require('joi');

const loginValidation = (req, res, next) => {
	const UserValidation = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	const { error } = UserValidation.validate(req.body);
	if (error) {
		return res.status(400).json({
			message: 'Login failed',
			errorCode: 400,
			error: error.details[0].message,
		});
	}
	next();
};

module.exports = loginValidation;
