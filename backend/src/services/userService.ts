import { CreateUserArgs } from '../types/userType';

class UserService {
	createUser(args: CreateUserArgs) {
		const { email, name, password } = args.user;

		const message = 'New User created';
		return { message };
	}
}

export const userService = new UserService();
