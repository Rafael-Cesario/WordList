export const listTypeDef = `#graphql
	type List {
		owner: String!
		listName: String!
		wordLists: WordLists!
	}

	type WordLists {
		next: [[String]]!
		current: [[String]]!
		done: [[String]]!
	}

	input NewListInput {
		owner: String!
		listName: String!
	}

	input ChangesInput {
		owner: String!
		oldName: String!
		newName: String!
	}

	input WordListInput {
		owner: String!
		listName: String!
	}

	input GetWordListsInput {
		owner: String!
		listName: String!
	}

	type MessageResponse {
		message: String!
	}

	type ResponseGetLists {
		lists: [String]!
	}

	type Query {
		getLists(owner:String!): ResponseGetLists!
		getWordLists(getWordLists: GetWordListsInput!): List!
	}

	type Mutation {
		createList ( newList: NewListInput!): MessageResponse!
		changeListName (changes: ChangesInput): MessageResponse!
		deleteList(owner:String!, listName:String!): MessageResponse!
		createWordList( wordList: WordListInput!): MessageResponse!
	}
`;
