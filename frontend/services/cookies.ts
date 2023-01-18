import axios from 'axios';

export const setCookies = async (name: string, cookie: string) => {
	const response = await axios.post('/api/cookies', { name, value: cookie });
	return response.data.message;
};

export const getCookies = async (cookie: string) => {
	const response = await axios.get('/api/cookies', { params: { name: cookie } });
	return response.data.cookie;
};

export const deleteCookies = async (cookie: string) => {
	const response = await axios.delete('/api/cookies', { params: { name: cookie } });
	return response.data.message;
};
