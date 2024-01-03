import { sign } from "jsonwebtoken";

export const generateToken = (email: string) => {
	const payload = { email };
	const secret = process.env.SECRET;
	const expiresIn = 60 * 60 * 24 * 7; // 1 week
	const token = sign(payload, secret, { expiresIn });
	return token;
};
