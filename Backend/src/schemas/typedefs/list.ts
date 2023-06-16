import gql from "graphql-tag";

export const typeList = gql`
	type list {
		userID: String!
		ID: String!
		name: String!
	}

	type Query {
		readLists(userID: String!): [list]!
	}
`;
