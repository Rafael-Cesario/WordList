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

	type Mutation {
		addWords(words: IAddWords!): TResponse!
	}
`;
