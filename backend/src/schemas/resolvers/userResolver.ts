import { userService } from '../../services/userService';
import { CreateUserArgs } from '../types/userType';

export const userResolver = {
	Query: {
		hello: () => 'Hello World',
	},

	Mutation: {
		createUser: (parent: any, args: CreateUserArgs) => userService.createUser(args),
	},
};
