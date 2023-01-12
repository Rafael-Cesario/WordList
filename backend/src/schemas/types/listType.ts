export interface CreateListArgs {
	newList: {
		belongsTo: string;
		listName: string;
	};
}

export interface CreateListResponse {
	message: string;
}

export const listTypeDef = `#graphql
	type List {
		belongsTo: String!
		listName: String!
		wordLists: [[String]]!
	}

	input NewListInput {
		belongsTo: String!
		listName: String!
	}

	type CreateListResponse {
		message: String!
	}


	type Mutation {
		createList ( newList: NewListInput!): CreateListResponse!
	}
`;
