import { describe, expect, it } from 'vitest';
import { IUserType } from '../../interfaces/interfacesUser';
import { UserRepository } from '../../repositories/userRepository';
import { encryptPassword } from '../../utils/crypt';
import { UserService } from '../serviceUser';

class UserRepositoryMock extends UserRepository {
	private users: IUserType[] = [];

	async createUser(user: IUserType) {
		const hash = encryptPassword(user.password);
		user.password = hash;
		this.users.push(user);
		return;
	}

	async findByEmail(email: string) {
		const [user] = this.users.filter(user => user.email === email);
		return user;
	}
}

describe('User Service', () => {
	const userService = new UserService(new UserRepositoryMock());

	describe('Create', () => {
		it('creates a new User', async () => {
			const user = { email: 'teste@teste.com', name: 'teste', password: '123' };
			const response = await userService.createUser({ user });

			expect(response).toHaveProperty('message');
			expect(response.message).toBe('New user created');
		});
	});

	describe('Read', () => {
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
	});

	describe('Login', () => {
		it('login a user', async () => {
			const user = { email: 'teste2@teste.com', password: '123' };
			await userService.createUser({ user: { ...user, name: 'teste' } });
			const response = await userService.login({ user });

			expect(response.message).toBe('Login');
			expect(response.token).toBeTruthy();
		});

		it('Email is wrong, login should fail', async () => {
			const user = { email: 'teste3@teste.com', password: '123' };
			await userService.createUser({ user: { ...user, name: 'teste' } });

			try {
				await userService.login({ user: { email: 'wrong@test.com', password: '123' } });
			} catch (error: any) {
				expect(error.message).toBe('Email/password is wrong');
			}
		});

		it('Password is wrong, login should fail', async () => {
			const user = { email: 'teste@teste.com', password: '123' };
			await userService.createUser({ user: { ...user, name: 'teste' } });

			try {
				await userService.login({ user: { email: 'teste@teste.com', password: 'wrong' } });
			} catch (error: any) {
				expect(error.message).toBe('Email/password is wrong');
			}
		});
	});
});
