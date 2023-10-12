import {useContext, useEffect, useState} from 'react';
import {ChatContext} from '../context/ChatContext';
import {baseUrl, getRequest} from '../utils/services';

export const useFetchLatestMessage = (chat) => {
	const {newMessage, notifications} = useContext(ChatContext);
	const [latestMessage, setLatestMessage] = useState(null);

	useEffect(() => {
		const getMessage = async () => {
			const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

			if (response.error) {
				return console.log('Error getting messages...', response);
			}

			const allMessages = response.data;
			console.log(allMessages);
			const latestMessage = allMessages[allMessages?.length - 1];
			console.log(latestMessage);

			setLatestMessage(latestMessage);
		};
		getMessage();
	}, [newMessage, notifications, chat?._id]);

	return {latestMessage};
};
