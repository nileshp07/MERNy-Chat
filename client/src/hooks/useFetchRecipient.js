import {useEffect, useState} from 'react';
import {baseUrl, getRequest} from '../utils/services';

export const useFetchRecipientUser = (chat, user) => {
	const [recipientUser, setRecipientUser] = useState(null);
	const [error, setError] = useState(null);

	const recipientId = chat?.members?.find((id) => id !== user?._id);

	// console.log('chat :', chat);

	useEffect(() => {
		const getUser = async () => {
			if (!recipientId) {
				return null;
			}

			const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
			// console.log(response.data.user);

			if (response.error) {
				return setError(response);
			}

			setRecipientUser(response.data.user);
		};

		getUser();
	}, [recipientId]);

	return {recipientUser};
};
