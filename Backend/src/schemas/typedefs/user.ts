import { gql } from "graphql-tag";

export const typeUser = gql`
	type TUser {
		email: String!
		password: String!
	}

	type RCreateUser {
		message: String!
	}

	input ICreateUser {
		email: String!
		password: String!
	}

	type Query {
		findOneUser(email: String): TUser
	}

	type Mutation {
		createUser(createUser: ICreateUser): RCreateUser!
	}
`;
