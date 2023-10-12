const userModel = require('./../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
	const jwtkey = process.env.JWT_SECRETKEY;

	return jwt.sign({_id}, jwtkey, {expiresIn: '3d'});
};

const registerUser = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		let user = await userModel.findOne({email});

		if (user)
			return res.status(400).json({
				status: 'fail',
				message: 'User with the given email already exists...',
			});

		if (!name || !email || !password)
			return res.status(400).json({
				status: 'fail',
				message: 'Please fill required fields...',
			});

		if (!validator.isEmail(email))
			return res.status(400).json({
				status: 'fail',
				message: 'Please enter a valid email...',
			});

		if (!validator.isStrongPassword(password))
			return res.status(400).json({
				status: 'fail',
				message:
					'Password must be a strong password ( should contain atleast 1 uppercase letter, numbers and a special character)...',
			});

		user = new userModel({name, email, password});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		await user.save();

		const token = createToken(user._id);

		res.status(200).json({
			status: 'sucess',
			data: {
				_id: user._id,
				name: name,
				email: email,
				token: token,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
};

const loginUser = async (req, res) => {
	const {email, password} = req.body;

	try {
		let user = await userModel.findOne({email});

		if (!user)
			return res.status(400).json({
				status: 'fail',
				message: 'Invalid email or password...',
			});

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword)
			return res.status(400).json({
				status: 'fail',
				message: 'Invalid email or password',
			});

		const token = createToken(user._id);

		res.status(200).json({
			status: 'success',
			message: 'Logged in successfully...',
			data: {
				_id: user._id,
				name: user.name,
				email: email,
				token: token,
			},
		});
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const findUser = async (req, res) => {
	const userId = req.params.userId;
	try {
		const user = await userModel.findById(userId);

		res.status(200).json({
			status: 'success',
			data: {user},
		});
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find();

		res.status(200).json({
			status: 'success',
			data: {users},
		});
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = {registerUser, loginUser, findUser, getAllUsers};
