import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const encryptPassword = (password: string) => {
	const rounds = 10;
	const salt = genSaltSync(rounds);
	const hash = hashSync(password, salt);
	return hash;
};

export const decryptPassword = (password: string, hashedPassword: string) => {
	const isSamePassword = compareSync(password, hashedPassword);
	return isSamePassword;
};
