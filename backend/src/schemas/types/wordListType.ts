export const wordListTypeDefs = `#graphql
	type WordList {
		next: [[String]]!
		current: [[String]]!
		done: [[String]]!
	}

	type MessageResponse {
		message: String!
	}

	input GetWordListInput {
		owner: String!
		listName: String!
	}

	type Query {
		getWordLists(getWordLists: GetWordListInput!): List!
	}


	input WordListInput {
		owner: String!
		listName: String!
	}

	input IDeleteWordList {
		owner: String!
		listName: String!
		wordListStatus: String!
		wordListIndex: String!
	}

	type Mutation {
		createWordList( wordList: WordListInput!): MessageResponse!
		deleteWordList( deleteWordList: IDeleteWordList): MessageResponse!
	}
`;
