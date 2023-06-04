import { ServiceUser } from "../../services/user";

const serviceUser = new ServiceUser();

export const resolverUser = {
	Mutation: {
		createUser: (parent: never, data: ICreateUser) => serviceUser.createUser(data),
	},
};
