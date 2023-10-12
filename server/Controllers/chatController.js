const chatModel = require('./../Models/chatModel');

// createChat
// findUserChats
// findChat

const createChat = async (req, res) => {
	const {firstId, secondId} = req.body;

	try {
		// Check if the chat between the specified users already exists
		const chat = await chatModel.findOne({
			// both: firstId & secondId should be there in the memebers array
			members: {$all: [firstId, secondId]},
		});

		if (chat)
			return res.status(200).json({
				status: 'success',
				data: chat,
			});

		// Create a new chat between firstUser and secondUser if not exist
		const newChat = new chatModel({
			members: [firstId, secondId],
		});

		// Save new chat and send as response
		const response = await newChat.save();
		console.log(response);

		res.status(200).json({
			status: 'success',
			data: response,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

const findUserChats = async (req, res) => {
	// Current userId from url parameters
	const userId = req.params.userId;

	try {
		const chats = await chatModel.find({
			// Only the current user should be there in members
			members: {$in: [userId]},
		});

		res.status(200).json({
			status: 'success',
			data: chats,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

const findChat = async (req, res) => {
	// extracting both the user ids (current user & user with the chat with) from url parameters
	const {firstId, secondId} = req.params;

	try {
		const chat = await chatModel.findOne({
			// both: firstId & secondId should be there in the memebers
			members: {$all: [firstId, secondId]},
		});

		res.status(200).json({
			status: 'success',
			data: chat,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

module.exports = {createChat, findChat, findUserChats};
