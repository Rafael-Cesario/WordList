export interface ListType {
	owner: string;
	listName: string;
	wordLists?: string[][];
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
