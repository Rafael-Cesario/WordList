import gql from "graphql-tag";

export const typeList = gql`
	type list {
		userID: String!
		_id: String!
		name: String!
		words: [word]!
		wordsPerWordList: Int!
		timesUntilLearning: Int!
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

	input IDeleteList {
		userID: String!
		ID: String!
	}

	type RDeleteList {
		message: String!
	}

	input IUpdateConfigs {
		userID: String!
		listID: String!
		wordsPerWordList: Int!
		timesUntilLearning: Int!
	}

	type RUpdateConfigs {
		message: String!
	}

	type Query {
		readLists(userID: String!): [list]!
		getOneList(userID: String!, listID: String!): list!
	}

	type Mutation {
		createList(createList: ICreateList!): RCreateList!
		renameList(renameList: IRenameList!): RRenameList!
		deleteList(deleteList: IDeleteList!): RDeleteList!
		updateConfigs(updateConfigs: IUpdateConfigs!): RUpdateConfigs!
	}
`;
