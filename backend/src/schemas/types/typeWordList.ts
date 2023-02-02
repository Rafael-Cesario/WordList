export const typeDefsWordList = `#graphql
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
		wordListIndex: Int!
	}

	input IChangeWordListStatus {
		owner: String!
		listName: String!
		wordListIndex: Int!
		wordListStatusOld: String! 
		wordListStatusNew: String! 
	}

	type Mutation {
		createWordList( wordList: WordListInput!): MessageResponse!
		deleteWordList( deleteWordList: IDeleteWordList!): MessageResponse!
		changeWordListStatus( changeWordListStatus: IChangeWordListStatus!): MessageResponse!
	}
`;
