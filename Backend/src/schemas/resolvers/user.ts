import { ICreateUser, IFindOneUser } from "../../interfaces/user";
import { ServiceUser } from "../../services/user";

const serviceUser = new ServiceUser();

export const resolverUser = {
	Query: {
		findOneUser: (parent: never, data: IFindOneUser) => serviceUser.findOneUser(data),
	},

	Mutation: {
		createUser: (parent: never, data: ICreateUser) => serviceUser.createUser(data),
	},
};
