import { test, describe, expect, beforeAll } from 'vitest';
import { startServer, server } from '../app';
import { startDatabase } from '../database';
import { READ_USER } from './queries';

interface ResponseType {
	body: {
		singleResult: {
			data: { [key: string]: any };
			errors?: {};
		};
	};
}

describe('User', () => {
	beforeAll(async () => {
		await startServer();
		await startDatabase();
	});

	describe('Read user', () => {
		test('User not found', async () => {
			const response = (await server.executeOperation({
				query: READ_USER,
				variables: { email: 'test@test.com' },
			})) as ResponseType;

			const data = response.body.singleResult.data.readUser;

			expect(data.message).toBe('User not found');
			expect(data.user).toBe(null);
		});
	});
});
