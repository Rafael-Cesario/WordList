import { userRepository } from '../repositories/userRepository';
import { CreateUserArgs } from '../schemas/types/userType';

class UserService {
	async createUser(args: CreateUserArgs) {
		const { email, name, password } = args.user;
		const newUser = await userRepository.createUser({ email, name, password });
		const message = 'New User created';

		return { message };
	}

	async readUser(args: { email: string }) {
		const { email } = args;
		const user = await userRepository.findByEmail(email);
		if (user) user.password = '';
		const message = 'User found';

		return { user, message };
	}
}

export const userService = new UserService();
