export const resolverUser = {
	Mutation: {
		createUser: (parent: never, { createUser }: ICreateUser) => ({ message: "Hello" }),
	},
};
