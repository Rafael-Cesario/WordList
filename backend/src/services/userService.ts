import { userRepository } from '../repositories/userRepository';
import { CreateUserArgs, LoginArgs } from '../schemas/types/userType';

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

	async login(args: LoginArgs) {
		const message = 'Login';
		const token = 'açslkfjç432lk5j23ç4l5kjç23lk45ç23l4k5j';

		return { message, token };
	}
}

export const userService = new UserService();
