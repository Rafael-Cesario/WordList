import { GraphQLError } from 'graphql';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserArgs, LoginArgs } from '../schemas/types/userType';
import { decryptPassword } from '../utils/crypt';
import { genToken } from '../utils/token';

export class UserService {
	constructor(private userRepository: UserRepository = new UserRepository()) {}

	async createUser(args: CreateUserArgs) {
		const { email, name, password } = args.user;
		const newUser = await this.userRepository.createUser({ email, name, password });
		const message = 'New user created';

		return { message };
	}

	async readUser(args: { email: string }) {
		const { email } = args;
		const user = await this.userRepository.findByEmail(email);
		if (user) user.password = '';
		const message = user ? 'User found' : 'User not found';

		return { user, message };
	}

	async login(args: LoginArgs) {
		const { email, password } = args.user;

		const user = await this.userRepository.findByEmail(email);
		if (!user) throw new GraphQLError('Email/password is wrong');

		const wrongPassword = decryptPassword(password, user.password);
		if (wrongPassword) throw new GraphQLError('Email/password is wrong');

		const message = 'Login';
		const token = genToken(email);

		return { message, token };
	}
}
