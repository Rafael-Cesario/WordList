import { describe, test } from 'vitest';
import { server } from '../mocks/server';
import { queriesUser } from '../queries/queriesUser';

describe('Queries user', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('Create user', async () => {
		const response = await queriesUser.createUser({ email: 'userEmail', name: 'userName', password: 'userPassword' });
		expect(response).toHaveProperty('message');
		expect(response.message).toBe('success');
	});

	test('Create user, error', async () => {
		const response = await queriesUser.createUser({ email: '', name: '', password: '' });
		expect(response).toHaveProperty('error');
		expect(response.error).toMatch(/Email was not provided/i);
	});

	test('Login', async () => {
		const response = await queriesUser.login({ email: 'userEmail', password: 'userPassword' });
		expect(response).toHaveProperty('message');
		expect(response.message).toBe('success');
	});

	test('Login, error', async () => {
		const response = await queriesUser.login({ email: 'wrong', password: '' });
		expect(response).toHaveProperty('error');
		expect(response.error).toMatch(/Email\/password is wrong/i);
	});
});
