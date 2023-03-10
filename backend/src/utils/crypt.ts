import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const encryptPassword = (password: string) => {
	const saltRounds = 10;
	const salt = genSaltSync(saltRounds);
	const hash = hashSync(password, salt);
	return hash;
};

export const decryptPassword = (inputPassword: string, userPassword: string) => {
	const isSamePassword = compareSync(inputPassword, userPassword);
	return !isSamePassword;
};
