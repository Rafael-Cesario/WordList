import { gql } from "graphql-tag";

export const typeUser = gql`
	type TUser {
		ID: String!
		email: String!
		password: String!
	}

	type RFindOneUser {
		user: TUser
		message: String
	}

	type RCreateUser {
		message: String!
	}

	type RLogin {
		message: String!
		token: String!
	}

	input ICreateUser {
		email: String!
		password: String!
	}

	input ILogin {
		email: String!
		password: String!
	}

	type Query {
		findOneUser(email: String): RFindOneUser!
	}

	type Mutation {
		createUser(createUser: ICreateUser): RCreateUser!
		login(login: ILogin): RLogin!
	}
`;
