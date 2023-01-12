import axios from 'axios';

export const setCookies = async (name: string, cookie: string) => {
	await axios.post('/api/cookies', {
		name,
		value: cookie,
	});
};

export const getCookies = async (cookie: string) => {
	const response = await axios.get('/api/cookies', { params: { name: cookie } });
	return response;
};

export const deleteCookies = async (cookie: string) => {
	const response = await axios.delete('/api/cookies', { params: { name: cookie } });
	return response;
};
