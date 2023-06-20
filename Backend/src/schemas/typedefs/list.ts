import gql from "graphql-tag";

export const typeList = gql`
	type list {
		userID: String!
		_id: String!
		name: String!
	}

	input ICreateList {
		userID: String!
		name: String!
	}

	type RCreateList {
		list: list!
	}

	input IRenameList {
		userID: String!
		ID: String!
		newName: String!
	}

	type RRenameList {
		list: list!
	}

	type Query {
		readLists(userID: String!): [list]!
	}

	type Mutation {
		createList(createList: ICreateList!): RCreateList!
		renameList(renameList: IRenameList!): RRenameList!
	}
`;
