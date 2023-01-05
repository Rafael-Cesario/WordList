import { userService } from '../../services/userService';
import { CreateUserArgs } from '../types/userType';

export const userResolver = {
	Query: {
		readUser: (parent: any, args: { email: string }) => userService.readUser(args),
	},

	Mutation: {
		createUser: (parent: any, args: CreateUserArgs) => userService.createUser(args),
	},
};
