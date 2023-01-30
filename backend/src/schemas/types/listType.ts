export const listTypeDef = `#graphql
	type List {
		owner: String!
		listName: String!
		wordLists: WordList!
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

	type MessageResponse {
		message: String!
	}

	type ResponseGetLists {
		lists: [String]!
	}

	type Query {
		getLists(owner:String!): ResponseGetLists!
	}

	type Mutation {
		createList ( newList: NewListInput!): MessageResponse!
		changeListName (changes: ChangesInput!): MessageResponse!
		deleteList(owner:String!, listName:String!): MessageResponse!
	}
`;
