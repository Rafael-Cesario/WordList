import gql from "graphql-tag";

export const typeList = gql`
	type list {
		userID: String!
		_id: String!
		name: String!
	}

	type RCreateList {
		list: list!
	}

	input ICreateList {
		userID: String!
		name: String!
	}

	type Query {
		readLists(userID: String!): [list]!
	}

	type Mutation {
		createList(createList: ICreateList!): RCreateList!
	}
`;
