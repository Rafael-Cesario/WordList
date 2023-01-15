export interface ListType {
	owner: string;
	listName: string;
	wordLists: string[][];
}

export interface CreateListArgs {
	newList: {
		owner: string;
		listName: string;
	};
}

export interface MessageResponse {
	message: string;
}

export interface ChangesArgs {
	changes: {
		owner: string;
		oldName: string;
		newName: string;
	};
}

export const listTypeDef = `#graphql
	type List {
		owner: String!
		listName: String!
		wordLists: [[String]]!
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
		changeListName (changes: ChangesInput): MessageResponse!
	}
`;
