import mongoose from 'mongoose';
import { startServer, server } from '../app';
import { startDatabase } from '../database';
import { UserModel } from '../models/userModel';
import { CREATE_USER, READ_USER } from './queries';
import { test, describe, expect, beforeAll, afterEach, afterAll } from 'vitest';

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

	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connections[0].dropDatabase();
		await mongoose.connections[0].close();
	});

	const user = {
		email: 'test@test.com',
		name: 'test',
		password: '123',
	};

	const createUser = async () => {
		(await server.executeOperation({
			query: CREATE_USER,
			variables: { user },
		})) as ResponseType;
	};

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

		test('User found', async () => {
			await createUser();

			const response = (await server.executeOperation({
				query: READ_USER,
				variables: { email: user.email },
			})) as ResponseType;

			const data = response.body.singleResult.data.readUser;

			expect(data.message).toBe('User found');
			expect(data.user.email).toBe(user.email);
			expect(data.user.password).toBe('');
		});
	});
});
