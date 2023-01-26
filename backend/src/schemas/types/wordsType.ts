export const wordsTypeDef = `#graphql
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

	type Mutation {
		addWords(words: IAddWords!): TResponse!
		removeWords(words: IRemoveWords!): TResponse!
	}
`;
