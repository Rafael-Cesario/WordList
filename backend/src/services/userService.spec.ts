import { describe, expect, it } from 'vitest';
import { UserRepository } from '../repositories/userRepository';
import { UserType } from '../schemas/types/userType';
import { UserService } from './userService';

class UserRepositoryMock implements UserRepository {
	private users = [{ email: 'teste@teste.com', name: 'teste', password: '123' }];

	async createUser(user: UserType) {
		return;
	}

	async findByEmail(email: string) {
		const [user] = this.users.filter(user => user.email === email);
		return user;
	}
}
describe('User Service', () => {
	const userService = new UserService(new UserRepositoryMock());

	it('creates a new User', async () => {
		const user = { email: 'teste@teste.com', name: 'teste', password: '123' };
		const response = await userService.createUser({ user });

		expect(response).toHaveProperty('message');
		expect(response.message).toBe('New user created');
	});

	it('returns a user', async () => {
		const email = 'teste@teste.com';
		const response = await userService.readUser({ email });

		expect(response.user.email).toBe(email);
		expect(response.user.password).toBe('');
		expect(response.message).toBe('User found');
	});

	it('Returns a empty user', async () => {
		const email = 'dummy@teste.com';
		const response = await userService.readUser({ email });

		expect(response.user).toBeUndefined();
		expect(response.message).toBe('User not found');
	});

	it.todo('login a user', () => {});
});
