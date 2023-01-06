import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const genToken = (email: string) => {
	const expiresIn = 1 * 60 * 60 * 24 * 7;
	const token = jwt.sign({ email }, process.env.SECRET!, { expiresIn });
	return token;
};
