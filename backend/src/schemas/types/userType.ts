export type UserType = {
	email: string;
	name: string;
	password: string;
};

export type CreateUserArgs = {
	user: UserType;
};

export const userTypeDefs = `#graphql
	type User {
		email: String!
		name: String!
		password: String!
	}

	input UserInput {
		email: String!
		name: String!
		password: String!
	}

	type Response {
		message: String!
	}

	type Query {
		hello: String!
	}

	type Mutation {
		createUser ( user: UserInput ) : Response!
	}
`;
