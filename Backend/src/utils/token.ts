import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (email: string) => {
	const SECRET = process.env.SECRET!;
	const expiresIn = 1 * 60 * 60 * 24 * 7; // 1 week;
	const token = jwt.sign({ email }, SECRET, { expiresIn });
	return token;
};
