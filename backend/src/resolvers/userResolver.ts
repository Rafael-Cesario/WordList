import { userService } from "../services/userService";
import { CreateUserArgs } from "../types/userType";

export const userResolver = {
	Mutation: {
		createUser: (parent: any, args: CreateUserArgs) => userService.createUser(args),
	},
};
