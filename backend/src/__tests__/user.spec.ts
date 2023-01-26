import mongoose from 'mongoose';
import { startServer, server } from '../app';
import { startDatabase } from '../database';
import { UserModel } from '../models/userModel';
import { test, describe, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { createUser, login, readUser } from './utils/queries';

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

	describe('Read user', () => {
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

	describe('Create User', () => {
		test('Creates a new user', async () => {
			const response = await createUser(user);
			const data = response.body.singleResult.data.createUser;
			expect(data.message).toBe('New user created');
		});

		test('password is crypted', async () => {
			await createUser(user);
			const dbUser = await UserModel.findOne({ email: user.email });
			expect(dbUser?.password).not.toBe(user.password);
		});

		test('email should be saved in lowercase', async () => {
			await createUser({ ...user, email: 'TEST@TEST.COM' });
			const dbUser = await UserModel.findOne({ email: 'TEST@TEST.COM' });
			expect(dbUser?.email).toBe('test@test.com');
		});

		test('Email, name, password is required', async () => {
			const response = await createUser({ email: '', name: '', password: '' });
			const data = response.body.singleResult.errors![0].message;

			expect(data).toBe(
				'Create User: User validation failed: email: Email is required, name: Name is required, password: Password is required'
			);
		});

		test('Name is too long', async () => {
			const response = await createUser({ ...user, name: 'this name is toooooooooooooooooo long' });
			const data = response.body.singleResult.errors![0].message;
			expect(data).toMatch(/is longer than the maximum allowed length/);
		});
	});

	describe('Login', () => {
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
});
