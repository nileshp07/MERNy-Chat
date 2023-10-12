const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messageRoutes');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
	res.send('Welcome to our chat app APIs...');
});

const port = process.env.PORT || 3000;
const db_uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
	console.log(`Server started on port ${port}`);
});

mongoose
	.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Mongodb connection established'))
	.catch((error) => console.log('Mongodb connection failed: ', error.message));
