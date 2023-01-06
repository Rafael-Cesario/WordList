import { it, expect } from 'vitest';
import { decryptPassword, encryptPassword } from './crypt';

it('Encrypt the password', () => {
	const password = 'VeryStrongPassword';
	const encrypted = encryptPassword(password);
	expect(encrypted).not.toEqual(password);
});

it('Verify if is the same password', () => {
	const password = 'AnotherStrongPassword';

	const encrypted1 = encryptPassword(password);
	const encrypted2 = encryptPassword('WrongPassword');

	const isWrongPassword1 = decryptPassword(password, encrypted1);
	const isWrongPassword2 = decryptPassword(password, encrypted2);

	expect(isWrongPassword1).toBeFalsy();
	expect(isWrongPassword2).toBeTruthy();
});
