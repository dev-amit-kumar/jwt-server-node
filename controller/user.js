const userModel = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/User');

exports.registerUser = async (req, res) => {
	const user = new userModel({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	try {
		const savedUser = await user.save();
		res.json({
			message: 'Register Successfull',
			errorCode: 200,
			savedUser,
		});
	} catch (err) {
		res.status(400).json({
			message: 'Register failed',
			errorCode: 400,
			error: err,
		});
	}
};

exports.loginUser = (req, res) => {
	userModel.findOne({ email: req.body.email }, (err, data) => {
		if (err)
			return res.status(500).json({
				message: 'Server error',
				errorCode: 500,
				error: err,
			});
		if (!data)
			return res.status(500).json({
				message: 'Login Failed',
				errorCode: 500,
				error: 'Email not found',
			});
		else {
			const checkPassword = bcrypt.compareSync(
				req.body.password,
				data.password,
			);
			if (!checkPassword)
				return res.status(500).json({
					message: 'Login Failed',
					errorCode: 500,
					error: 'Invalid password',
				});

			var token = jwt.sign({ id: data._id }, config.secret, {
				expiresIn: 86400,
			});
			return res.json({
				message: 'Login successfull',
				errorCode: 200,
				token: token,
			});
		}
	});
};

exports.userProfile = (req, res) => {
	var token = req.headers['x-access-token'];
	if (!token)
		return res
			.status(400)
			.json({ message: 'Token not found', errorCode: 400 });
	jwt.verify(token, config.secret, (err, data) => {
		if (err)
			return res
				.status(500)
				.json({ message: 'Server Error', errorCode: 500, error: err });
		User.findById(data.id, { password: 0 }, (err, result) => {
			res.json({
				message: 'User found',
				errorCode: 200,
				data: result,
			});
		});
	});
};
