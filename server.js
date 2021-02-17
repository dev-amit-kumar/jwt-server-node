const express = require('express');
const server = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6700;

server.use(express.json());

// import routes
const authRouter = require('./routes/auth');

// Middleware routes
server.use('/user', authRouter);

// CONNECT TO DB
mongoose.connect(
	'mongodb+srv://admin:mongo123@cluster0.pwmth.mongodb.net/jwt_user?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) throw err;
		console.log('connected to db');
	},
);

server.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server is running at port ${PORT}`);
});
