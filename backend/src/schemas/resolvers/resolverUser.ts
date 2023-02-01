import { ICreateUser, ILogin } from '../../interfaces/interfacesUser';
import { UserService } from '../../services/serviceUser';

const userService = new UserService();

export const userResolver = {
	Query: {
		readUser: (parent: any, args: { email: string }) => userService.readUser(args),
	},

	Mutation: {
		createUser: (parent: any, args: { user: ICreateUser }) => userService.createUser(args),
		login: (parent: any, args: { user: ILogin }) => userService.login(args),
	},
};
