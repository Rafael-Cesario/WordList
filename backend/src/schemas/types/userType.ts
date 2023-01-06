export type UserType = {
	email: string;
	name: string;
	password: string;
};

export type CreateUserArgs = {
	user: UserType;
};

export type LoginArgs = {
	user: {
		email: string;
		password: string;
	};
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

	input LoginInput {
		email: String!
		password: String!
	}

	type Response {
		user: User
		message: String!
	}

	type LoginResponse {
		message: String!
		token: String
	}

	type Query {
		readUser (email: String!) : Response!
	}

	type Mutation {
		createUser ( user: UserInput ) : Response!
		login ( user: LoginInput ) : LoginResponse!
	}
`;
