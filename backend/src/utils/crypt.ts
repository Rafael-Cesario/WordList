import { genSaltSync, hashSync } from 'bcrypt';

export const encryptPassword = (password: string) => {
	const saltRounds = 10;
	const salt = genSaltSync(saltRounds);
	const hash = hashSync(password, salt);
	return hash;
};