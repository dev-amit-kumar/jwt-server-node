const userModel = require('../model/User');

exports.registerUser = async (req, res) => {
	const user = new userModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
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
