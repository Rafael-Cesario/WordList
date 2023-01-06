import jwt from 'jsonwebtoken';
import { it, expect } from 'vitest';
import { genToken } from './token';

it('returns a token', () => {
	const email = 'teste@teste.com';

	const token = genToken(email);
	expect(token).not.toBeNull();

	const payload = jwt.decode(token);
	expect(payload).toHaveProperty('email', email);
});
