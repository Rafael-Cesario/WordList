import { userService } from '../../services/userService';
import { CreateUserArgs, LoginArgs } from '../types/userType';

export const userResolver = {
	Query: {
		readUser: (parent: any, args: { email: string }) => userService.readUser(args),
	},

	Mutation: {
		createUser: (parent: any, args: CreateUserArgs) => userService.createUser(args),
		login: (parent: any, args: LoginArgs) => userService.login(args),
	},
};
