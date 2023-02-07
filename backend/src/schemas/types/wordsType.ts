export const wordsTypeDef = `#graphql
	type Words {
		words: [[String]]!
	}

	type TResponse {
		message: String!
	}

	input IAddWords {
		owner: String!
		listName: String!
		term: String!
		definition: String!
		listIndex: String!
		status: String!
	}

	input IRemoveWords {
		owner: String!
		listName: String!
		status: String!
		listIndex: String!
		wordIndex: String!
	}

	input IGetWords {
		owner: String!
		listName: String!
		status: String!
		listIndex: String!
	}

	input IRenameWords {
		owner: String!
		listName:String!
		listStatus: String!
		listIndex: String!
		wordIndex: String!
		newWords: [String!]!
	}

	type Query {
		getWords(words: IGetWords!): Words!
	}

	type Mutation {
		addWords(words: IAddWords!): TResponse!
		removeWords(words: IRemoveWords!): TResponse!
		renameWords(words: IRenameWords!): TResponse!
	}
`;
