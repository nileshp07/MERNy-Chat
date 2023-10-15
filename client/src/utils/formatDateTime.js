import moment from 'moment';

export const formatDateTime = (date) => {
	const today = moment();
	const yesterday = today.clone().subtract(1, 'days');

	if (date.isSame(today, 'day')) {
		return date.format('hh:mm a');
	} else if (date.isSame(yesterday, 'day')) {
		return 'Yesterday';
	} else {
		return date.format('DD/MM/YY');
	}
};
