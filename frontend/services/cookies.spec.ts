import { describe, test, expect } from 'vitest';

import { getCookies } from './cookies';
import { server } from './mocks/server';

describe('Cookies tests', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('returns the user email', async () => {
		const response = await getCookies('user');
		expect(response).toBe('UserEmail');
	});
});
