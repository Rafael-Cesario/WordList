import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const cookies = (req: NextApiRequest, res: NextApiResponse) => {
	const method = req.method;

	method === 'GET' && getCookie(req, res);
	method === 'POST' && setCookie(req, res);
	method === 'DELETE' && deleteCookie(req, res);
};

const getCookie = (req: NextApiRequest, res: NextApiResponse) => {
	const name = req.query.name as string;
	const cookie = req.cookies[name];
	res.status(200).json({ cookie });
};

const setCookie = (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader(
		'Set-Cookie',
		cookie.serialize(req.body.name, req.body.value, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			sameSite: 'strict',
			path: '/',
		})
	);

	res.status(200).json({ message: 'Cookie set' });
};

const deleteCookie = (req: NextApiRequest, res: NextApiResponse) => {
	req.cookies[req.body.name] = '';
	res.status(200).json({ message: 'Cookie deleted' });
};

export default cookies;
