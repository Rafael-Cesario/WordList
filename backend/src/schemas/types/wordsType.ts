export const wordsTypeDef = `#graphql
	type Words {
		words: [String]!
	}

	type TResponse {
		message: String!
	}

	input IAddWords {
		owner: String!
		listName: String!
		term: String!
		definition: String!
		listIndex: Int!
		status: String!
	}

	input IRemoveWords {
		owner: String!
		listName: String!
		status: String!
		listIndex: Int!
		wordIndex: Int!
	}

	input IGetWords {
		owner: String!
		listName: String!
		status: String!
		listIndex: Int!
	}

	type Query {
		getWords(words: IGetWords!): Words!
	}

	type Mutation {
		addWords(words: IAddWords!): TResponse!
		removeWords(words: IRemoveWords!): TResponse!
	}
`;
