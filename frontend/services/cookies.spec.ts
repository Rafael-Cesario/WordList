import { describe, test, expect } from 'vitest';

import { getCookies, setCookies } from './cookies';
import { server } from './mocks/server';

describe('Cookies tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('returns the user email', async () => {
		const response = await getCookies('user');
		expect(response).toBe('UserEmail');
	});

	test('Set a new cookie', async () => {
		const response = await setCookies('user', 'UserEmail');
		expect(response).toBe('Cookie set');
	});
});
