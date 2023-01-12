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

export interface CreateListResponse {
	message: string;
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

	type CreateListResponse {
		message: String!
	}

	type ResponseGetLists {
		lists: [String]!
	}

	type Query {
		getLists(owner:String!): ResponseGetLists!
	}

	type Mutation {
		createList ( newList: NewListInput!): CreateListResponse!
	}
`;
