import mongoose from 'mongoose';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { UserModel } from '../../models/userModel';
import { test, describe, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { createUser, login } from '../__utils__/queriesUser';

describe('User', () => {
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

	const { email, password } = user;

	test('Returns a token after login', async () => {
		await createUser(user);

		const response = await login({ user: { email, password } });
		const data = response.body.singleResult.data.login;

		expect(data.message).toBe('Login');
		expect(data.token).not.toBeNull();
	});

	test(`User doesn't exist`, async () => {
		const response = await login({ user: { email, password } });
		const error = response.body.singleResult.errors![0];
		expect(error.message).toBe('Email/password is wrong');
	});

	test('Email is wrong', async () => {
		await createUser(user);
		const response = await login({ user: { email: 'wrong@test.com', password } });
		const error = response.body.singleResult.errors![0];
		expect(error.message).toBe('Email/password is wrong');
	});

	test('Password is wrong', async () => {
		await createUser(user);
		const response = await login({ user: { email, password: 'wrong' } });
		const error = response.body.singleResult.errors![0];
		expect(error.message).toBe('Email/password is wrong');
	});
});
