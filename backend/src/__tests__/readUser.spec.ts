import mongoose from 'mongoose';
import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../app';
import { startDatabase } from '../database';
import { UserModel } from '../models/userModel';
import { readUser, createUser } from './utils/queriesUser';

describe('Read user', () => {
	beforeAll(async () => {
		await startServer(0);
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

	test('User not found', async () => {
		const response = await readUser(user.email);
		const data = response.body.singleResult.data.readUser;

		expect(data.message).toBe('User not found');
		expect(data.user).toBe(null);
	});

	test('User found', async () => {
		await createUser(user);

		const response = await readUser(user.email);
		const data = response.body.singleResult.data.readUser;

		expect(data.message).toBe('User found');
		expect(data.user.email).toBe(user.email);
		expect(data.user.password).toBe('');
	});
});
