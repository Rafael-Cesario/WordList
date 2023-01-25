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

export interface DeleteListInput {
	owner: string;
	listName: string;
}

export interface ChangesInput {
	owner: string;
	oldName: string;
	newName: string;
}

export interface WordListInput {
	owner: string;
	listName: string;
}

export interface GetWordListsInput {
	owner: string;
	listName: string;
}
