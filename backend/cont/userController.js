const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		res.status(400);
		throw errorHandler(`Please provide a name, email and password`);
	}

	const user_exists = await User.findOne({ email })

	if (user_exists) {
		res.status(400);
		throw Error(`User with email ${email} already exists`);
	}

	const salt = await bcrypt.genSalt(10);
	const hashed_password = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashed_password
	})

	if (user) {
		res.status(200);
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token : generateJWT(user._id)
		})
	} else {
		res.status(400);
		throw Error(`Registration Failed`);
	}
})

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200);
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token : generateJWT(user._id)
		})
	} else {
		res.status(400);
		throw Error(`Invalid credentials`);
	}
})

const getMe = asyncHandler(async (req, res) => {
	const {_id, name, email} = await User.findById(req.user._id)

	res.json({
		id: _id,
		name,
		email	
	})
})

const generateJWT = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET,{
		expiresIn : '30d',
	})
}


module.exports = {
	registerUser,
	getMe,
	loginUser
}