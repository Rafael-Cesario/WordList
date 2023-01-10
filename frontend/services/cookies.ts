import axios from 'axios';

export const setCookies = async (cookie: string) => {
	await axios.post('/api/cookies', {
		name: 'token',
		value: cookie,
	});
};

export const getCookies = async (cookie: string) => {
	const response = await axios.get('/api/cookies', { params: { name: cookie } });

	return response;
};
